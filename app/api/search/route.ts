import { NextRequest, NextResponse } from "next/server";
import {
  IGeoCode,
  getAddressGeocoded,
  getLatLongFromGeoCodeResult,
} from "@/features/googleAPI/geocoder";
import { getNearbyAtms } from "@/features/googleAPI/nearbySearch";
import {
  errorMessageQueue,
  errorMessageStrings,
  errorSeverity,
} from "@/lib/errors";
import {
  searchResults,
  bankNameList,
  processAtmDataForRedux,
} from "@/lib/atmObject";
import { cullDuplicatesBasedOnId } from "@/utils/objects";
import { validateRangeInput } from "@/lib/searchRangeValidation";

//config
import {
  MAP_CENTER_DEFAULT,
  SEARCH_RANGE_MIN,
  SEARCH_RANGE_MAX,
  SEARCHADDRESS_PARAM_NAME,
  SEARCHRANGE_PARAM_NAME,
  FILTEREDBANKS_PARAM_NAME,
} from "@/config/app.config";

export async function GET(req: NextRequest) {
  try {
    let errors: errorMessageQueue = [];

    //=========================================================================== defining searchRange from API query param
    const rangeInput: string | null = req.nextUrl.searchParams.get(
      SEARCHRANGE_PARAM_NAME
    );
    //if range not defined, set to max range by default
    const searchRange: number = validateRangeInput(
      rangeInput,
      SEARCH_RANGE_MIN,
      SEARCH_RANGE_MAX
    );

    //=========================================================================== defining address searched from API query param
    const addressInput: string | null = req.nextUrl.searchParams.get(
      SEARCHADDRESS_PARAM_NAME
    );

    //send immediate response here for geocoding error if address not found
    //TODO should validate and sanitize addressInput string here first
    if (!addressInput) {
      errors.push({
        message: errorMessageStrings.geocodingAPIFailure,
        severity: errorSeverity.CRITICAL,
      });
      const searchData: searchResults = {
        searchPointLatLong: MAP_CENTER_DEFAULT,
        searchRange,
        desiredAtms: [],
        errorMessages: errors,
      };

      return new NextResponse(JSON.stringify(searchData));
    }

    //TODO to align addressInput, rangeInput and filteredBanks
    //=========================================================================== geocoding input address
    console.log("in api search route. going to start geocoding next");

    const geocodedAddress = await getAddressGeocoded(addressInput);
    console.log(geocodedAddress);
    //send immediate response here for geocoding error if geocoding status not ok
    if (geocodedAddress.status !== "OK") {
      console.log("geocoding status not ok");
      errors.push({
        message: errorMessageStrings.geocodingAPIFailure,
        severity: errorSeverity.CRITICAL,
      });
      const searchData: searchResults = {
        searchPointLatLong: MAP_CENTER_DEFAULT,
        searchRange,
        desiredAtms: [],
        errorMessages: errors,
      };

      return new NextResponse(JSON.stringify(searchData));
    }

    const searchPointLatLong: IGeoCode = getLatLongFromGeoCodeResult(
      geocodedAddress.results[0]
    );

    //=========================================================================== defining filteredBanks from API query param
    const filteredBanksInput: string | null = req.nextUrl.searchParams.get(
      FILTEREDBANKS_PARAM_NAME
    );
    const filteredBanks: string[] =
      filteredBanksInput !== null ? filteredBanksInput.split(",") : [];
    //TODO validate each bank here

    //=========================================================================== fetching all atms for each bank selected
    const fetchNearbyAtms = bankNameList
      .filter((bankName) => !filteredBanks.includes(bankName))
      .map((bankName) =>
        getNearbyAtms({
          searchPoint: searchPointLatLong,
          searchRadius: searchRange,
          bank: bankName.toLowerCase(),
        })
      );

    //=========================================================================== filtering through atms found
    const desiredAtms = await Promise.all(fetchNearbyAtms)
      .then((response) =>
        response.map((item) => {
          switch (item.data.status) {
            //failed to reach API
            case "INVALID_REQUEST" || "API error":
              errors.push({
                message:
                  errorMessageStrings.placesAPIFailure + " for " + item.bank,
                severity: errorSeverity.CRITICAL,
              });
              break;
            //no ATM results found
            case "ZERO_RESULTS":
              errors.push({
                message:
                  errorMessageStrings.placesDataFailure + " for " + item.bank,
                severity: errorSeverity.OK,
              });
              break;
            //no errors
            case "OK":
              break;
            //other errors
            default:
              errors.push({
                message: `Nearby Places Error: ${item.data.status}. ${
                  item.data.error_message || ""
                } for ${item.bank}`,
                severity: errorSeverity.CRITICAL,
              });
              break;
          }
          return item.data.results;
        })
      )
      .then((results) => results.flat())
      .then((results) => {
        const { cleanArray, cleanIds, culledIndexes } = cullDuplicatesBasedOnId(
          results,
          "place_id"
        );
        return cleanArray;
      })
      .then((results) =>
        processAtmDataForRedux({
          fullAtmList: results,
          searchPoint: searchPointLatLong,
          searchRange: searchRange,
          bankFilterList: filteredBanks,
        })
      );

    //=========================================================================== checking count of valid atms
    if (desiredAtms.length < 1)
      errors.push({
        message: errorMessageStrings.noResultsFound,
        severity: errorSeverity.WARNING,
      });

    // ========================================================================== sending valid atm data as response, with errorlist
    const searchData: searchResults = {
      searchPointLatLong,
      searchRange,
      desiredAtms,
      errorMessages: errors,
    };

    return new NextResponse(JSON.stringify(searchData));
  } catch (err) {
    // ========================================================================== send error for failing to hit API
    const rangeInput: string | null = req.nextUrl.searchParams.get(
      SEARCHRANGE_PARAM_NAME
    );
    //if range not defined, set to max range by default
    //if range not defined, set to max range by default
    const searchRange: number = validateRangeInput(
      rangeInput,
      SEARCH_RANGE_MIN,
      SEARCH_RANGE_MAX
    );
    const searchData: searchResults = {
      searchPointLatLong: MAP_CENTER_DEFAULT,
      searchRange,
      desiredAtms: [],
      errorMessages: [
        {
          message: errorMessageStrings.searchAPIFailure,
          severity: errorSeverity.CRITICAL,
        },
      ],
    };
    return new NextResponse(JSON.stringify(searchData));
  }
}

/*
export async function POST(req: NextRequest) {
  try {
    const { addressInput, searchRange, filteredBanks } = await req.json();

    let errors: errorMessageQueue = [];

    // geocoding input address
    console.log("in api search route. going to start geocoding next");
    const geocodedAddress = await getAddressGeocoded(addressInput);
    console.log(geocodedAddress);
    if (geocodedAddress.status !== "OK") {
      console.log("geocoding status not ok");
      errors.push({
        message: errorMessageStrings.geocodingAPIFailure,
        severity: errorSeverity.CRITICAL,
      });
      //send immediate response here for geocoding error
      const searchData: searchResults = {
        searchPointLatLong: MAP_CENTER_DEFAULT,
        searchRange,
        desiredAtms: [],
        errorMessages: errors,
      };

      return new NextResponse(JSON.stringify(searchData));
    }

    const searchPointLatLong: IGeoCode = getLatLongFromGeoCodeResult(
      geocodedAddress.results[0]
    );

    const fetchNearbyAtms = bankNameList
      .filter((bankName) => !filteredBanks.includes(bankName))
      .map((bankName) =>
        getNearbyAtms({
          searchPoint: searchPointLatLong,
          searchRadius: searchRange,
          bank: bankName.toLowerCase(),
        })
      );

    const desiredAtms = await Promise.all(fetchNearbyAtms)
      .then((response) =>
        response.map((item) => {
          switch (item.data.status) {
            //failed to reach API
            case "INVALID_REQUEST" || "API error":
              errors.push({
                message:
                  errorMessageStrings.placesAPIFailure + " for " + item.bank,
                severity: errorSeverity.CRITICAL,
              });
              break;
            //no ATM results found
            case "ZERO_RESULTS":
              errors.push({
                message:
                  errorMessageStrings.placesDataFailure + " for " + item.bank,
                severity: errorSeverity.OK,
              });
              break;
            //no errors
            case "OK":
              break;
            //other errors
            default:
              errors.push({
                message: `Nearby Places Error: ${item.data.status}. ${
                  item.data.error_message || ""
                } for ${item.bank}`,
                severity: errorSeverity.CRITICAL,
              });
              break;
          }
          return item.data.results;
        })
      )
      .then((results) => results.flat())
      .then((results) => {
        const { cleanArray, cleanIds, culledIndexes } = cullDuplicatesBasedOnId(
          results,
          "place_id"
        );
        return cleanArray;
      })
      .then((results) =>
        processAtmDataForRedux({
          fullAtmList: results,
          searchPoint: searchPointLatLong,
          searchRange: searchRange,
          bankFilterList: filteredBanks,
        })
      );

    if (desiredAtms.length < 1)
      errors.push({
        message: errorMessageStrings.noResultsFound,
        severity: errorSeverity.WARNING,
      });

    const searchData: searchResults = {
      searchPointLatLong,
      searchRange,
      desiredAtms,
      errorMessages: errors,
    };

    return new NextResponse(JSON.stringify(searchData));
  } catch (err) {
    const { addressInput, searchRange, filteredBanks } = await req.json();

    const searchData: searchResults = {
      searchPointLatLong: MAP_CENTER_DEFAULT,
      searchRange,
      desiredAtms: [],
      errorMessages: [
        {
          message: errorMessageStrings.searchAPIFailure,
          severity: errorSeverity.CRITICAL,
        },
      ],
    };

    return new NextResponse(JSON.stringify(searchData));
  }
}
*/
