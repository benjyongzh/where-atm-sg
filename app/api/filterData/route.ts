import { NextRequest, NextResponse } from "next/server";
import {
  getAddressGeocoded,
  getLatLongFromGeoCodeResult,
} from "@/features/googleAPI/geocoder";
import { getNearbyAtms } from "@/features/googleAPI/nearbySearch";
import { IGeoCode } from "@/features/settings/settingsSlice";
import { errorMessageObject } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const { addressInput, rangeValue } = await req.json();

    let errorMessages: errorMessageObject[] = [];

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

    const nearbyAtms = await getNearbyAtms({
      searchPoint: searchPointLatLong,
      searchRadius: rangeValue,
      bank: "dbs", //need an input for this
    });

    if (nearbyAtms.status !== "OK") {
      errorMessages.push({
        errorMessage: `Nearby Places Error: ${nearbyAtms.status}. ${
          nearbyAtms.error_message || ""
        }`,
      });
    }

    const searchData = {
      searchPointLatLong,
      rangeValue,
      nearbyAtms,
      errorMessages,
    };

    return new NextResponse(JSON.stringify(searchData));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "failed to fetch data" })
    );
  }
}
