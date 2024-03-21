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

//config
import {
  MAP_CENTER_DEFAULT,
  SEARCHADDRESS_PARAM_NAME,
  SEARCHRANGE_PARAM_NAME,
  FILTEREDBANKS_PARAM_NAME,
} from "@/config/app.config";

export async function GET(req: NextRequest) {
  try {
    const addressInput: string | null = req.nextUrl.searchParams.get(
      SEARCHADDRESS_PARAM_NAME
    );
    const rangeInput: string | null = req.nextUrl.searchParams.get(
      SEARCHRANGE_PARAM_NAME
    );
    const filteredBanksInput: string | null = req.nextUrl.searchParams.get(
      FILTEREDBANKS_PARAM_NAME
    );

    const filteredBanks: string[] =
      filteredBanksInput !== null ? filteredBanksInput.split(",") : [];

    let errors: errorMessageQueue = [];

    // const endpoint = `/api/search?${SEARCHADDRESS_PARAM_NAME}=${addressInput}&${SEARCHRANGE_PARAM_NAME}=${storedRange}`;

    // Send the form data to our forms API on Vercel and get a response.
    // const response = await fetch(endpoint, options);
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

    return new NextResponse(
      JSON.stringify({ addressInput, rangeInput, filteredBanks })
    );
  } catch (err) {
    const rangeInput: string | null = req.nextUrl.searchParams.get(
      SEARCHRANGE_PARAM_NAME
    );
    const searchData: searchResults = {
      searchPointLatLong: MAP_CENTER_DEFAULT,
      rangeInput,
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
