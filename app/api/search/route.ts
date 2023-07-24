import { NextRequest, NextResponse } from "next/server";
import {
  getAddressGeocoded,
  getLatLongFromGeoCodeResult,
} from "@/features/googleAPI/geocoder";
import { getNearbyAtms } from "@/features/googleAPI/nearbySearch";
import { IGeoCode } from "@/features/googleAPI/geocoder";
import { errorMessageObject } from "@/lib/errors";
import { bankNameList } from "@/lib/atmObject";
import { cullDuplicatesBasedOnId } from "@/utils/objects";

export async function POST(req: NextRequest) {
  try {
    const { addressInput, searchRange, filteredBanks } = await req.json();

    let errorMessages: errorMessageObject[] = [];

    // geocoding input address
    const geocodedAddress = await getAddressGeocoded(addressInput);
    if (geocodedAddress.status !== "OK") {
      errorMessages.push({
        errorMessage: `Geocoding Error: ${geocodedAddress.status}. ${
          geocodedAddress.error_message || ""
        }`,
      });
    }
    const searchPointLatLong: IGeoCode = getLatLongFromGeoCodeResult(
      geocodedAddress.results[0]
    );

    const atmBankCalls = bankNameList
      .filter((bankName) => !filteredBanks.includes(bankName))
      .map((bankName) =>
        getNearbyAtms({
          searchPoint: searchPointLatLong,
          searchRadius: searchRange,
          bank: bankName.toLowerCase(),
        })
      );

    const desiredAtms = await Promise.all(atmBankCalls)
      .then((response) =>
        response.map((item) => {
          if (item.status !== "OK") {
            errorMessages.push({
              errorMessage: `Nearby Places Error: ${item.status}. ${
                item.error_message || ""
              }`,
            });
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
        // console.log(cleanArray);
        // console.log(cleanIds);
        // console.log(culledIndexes);
        return cleanArray;
      });

    //find all nearby ATMs
    /* const nearbyAtms = await getNearbyAtms({
      searchPoint: searchPointLatLong,
      searchRadius: searchRange,
      // bank: "dbs", //need an input for this
    });

    if (nearbyAtms.status !== "OK") {
      errorMessages.push({
        errorMessage: `Nearby Places Error: ${nearbyAtms.status}. ${
          nearbyAtms.error_message || ""
        }`,
      });
    } */

    const searchData = {
      searchPointLatLong,
      searchRange,
      desiredAtms,
      errorMessages,
    };

    return new NextResponse(JSON.stringify(searchData));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "failed to fetch data, " + err })
    );
  }
}
