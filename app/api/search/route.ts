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
  errorMessageObject,
  setDisplayErrorMessage,
  errorMessageStrings,
  addToErrorMessageList,
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

    // let errorMessages: errorMessageObject[] = [];

    // geocoding input address
    const geocodedAddress = await getAddressGeocoded(addressInput);
    if (geocodedAddress.status !== "OK") {
      addToErrorMessageList(errorMessageStrings.geocodingAPIFailure);
      /* errorMessages.push({
        errorMessage: `Geocoding Error: ${geocodedAddress.status}. ${
          geocodedAddress.error_message || ""
        }`,
      }); */
      //send immediate response here for geocoding error
      const searchData: searchResults = {
        searchPointLatLong: mapCenterDefault,
        searchRange,
        desiredAtms: [],
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
          if (item.status !== "OK") {
            /* errorMessages.push({
              errorMessage: `Nearby Places Error: ${item.status}. ${
                item.error_message || ""
              }`,
            }); */
            addToErrorMessageList(
              `Nearby Places Error: ${item.status}. ${item.error_message || ""}`
            );
          }
          return item.results;
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
      addToErrorMessageList(errorMessageStrings.noResultsFound);

    const searchData: searchResults = {
      searchPointLatLong,
      searchRange,
      desiredAtms,
    };

    return new NextResponse(JSON.stringify(searchData));
  } catch (err) {
    // return new NextResponse(
    //   JSON.stringify({ errorMessage: "failed to fetch data, " + err }));

    // const { addressInput, searchRange, filteredBanks } = await req.json();
    addToErrorMessageList(errorMessageStrings.searchAPIFailure);

    /* const searchData: searchResults = {
      searchPointLatLong: mapCenterDefault,
      searchRange,
      desiredAtms: [],
    };

    return new NextResponse(JSON.stringify(searchData)); */
  }
}
