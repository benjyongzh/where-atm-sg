import { NextRequest, NextResponse } from "next/server";
import { mapCenterDefault } from "@/features/settings/settingsSlice";
import {
  IGeoCode,
  getAddressGeocoded,
  getLatLongFromGeoCodeResult,
} from "@/features/googleAPI/geocoder";
import { getNearbyAtms } from "@/features/googleAPI/nearbySearch";
// import { getPlaceDetails } from "@/features/googleAPI/placeDetails";
import {
  errorMessageQueue,
  setDisplayErrorMessage,
  errorMessageStrings,
  addToErrorMessageList,
  errorSeverity,
} from "@/lib/errors";
import {
  IAtmObject,
  searchResults,
  bankNameList,
  bankFilters,
  processAtmDataForRedux,
  // groupAccordingToKey,
} from "@/lib/atmObject";
import { cullDuplicatesBasedOnId } from "@/utils/objects";

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
      // addToErrorMessageList(errorMessageStrings.geocodingAPIFailure);
      errors.push({
        message: errorMessageStrings.geocodingAPIFailure,
        severity: errorSeverity.CRITICAL,
      });
      //send immediate response here for geocoding error
      const searchData: searchResults = {
        searchPointLatLong: mapCenterDefault,
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
          /* if (
            item.status === "INVALID_REQUEST" ||
            item.status === "API error"
          ) {
            errors.push(errorMessageStrings.placesAPIFailure);
          } else if (item.status === "ZERO_RESULTS") {
            //no ATM results found
            errors.push(errorMessageStrings.placesDataFailure);
          } else if (item.status !== "OK") {
            //other kinds of failure
            errors.push(
              `Nearby Places Error: ${item.status}. ${item.error_message || ""}`
            );
          } */
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

    // console.log(`desiredAtms: `, desiredAtms);
    // const groupedArray = groupAccordingToKey(desiredAtms, "brand", bankFilters);
    // console.log(`grouped Array: `, groupedArray);

    /* const fetchDetails = desiredAtms.map((result) =>
      getPlaceDetails(result.place_id)
    );

    const atmDetails = await Promise.all(fetchDetails)
      .then((responses) => responses.map((atmItem) => atmItem.result))
      .then((results) =>
        processAtmDataForRedux({
          fullAtmList: results,
          searchPoint: searchPointLatLong,
          searchRange: searchRange,
          bankFilterList: filteredBanks,
        })
      );
    console.log(`atmDetails: `, atmDetails); */
    if (desiredAtms.length < 1)
      // addToErrorMessageList(errorMessageStrings.noResultsFound);
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
    // return new NextResponse(
    //   JSON.stringify({ errorMessage: "failed to fetch data, " + err }));

    const { addressInput, searchRange, filteredBanks } = await req.json();
    // addToErrorMessageList(errorMessageStrings.searchAPIFailure);

    const searchData: searchResults = {
      searchPointLatLong: mapCenterDefault,
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
