import { NextRequest, NextResponse } from "next/server";
import {
  getAddressGeocoded,
  getLatLongFromGeoCodeResult,
} from "@/features/googleAPI/geocoder";
import { getNearbyAtms } from "@/features/googleAPI/nearbySearch";
import { IGeoCode } from "@/features/settings/settingsSlice";

export async function POST(req: NextRequest) {
  try {
    const { addressInput, rangeValue } = await req.json();

    const geocodedAddress = await getAddressGeocoded(addressInput);
    //validate address location to be in Singapore
    //check status==="OK"
    const searchPointLatLong: IGeoCode = getLatLongFromGeoCodeResult(
      geocodedAddress.results[0]
    );

    const nearbyAtms = await getNearbyAtms({
      searchPoint: searchPointLatLong,
      searchRadius: rangeValue,
      bank: "dbs", //need an input for this
    });
    const searchData = { searchPointLatLong, rangeValue, nearbyAtms };

    return new NextResponse(JSON.stringify(searchData));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "failed to fetch any data" })
    );
  }
}
