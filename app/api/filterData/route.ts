import { NextRequest, NextResponse } from "next/server";
import { getAddressGeocoded } from "@/features/googleAPI/geocoder";

export async function POST(req: NextRequest) {
  try {
    const { addressInput, rangeValue } = await req.json();
    // console.log(addressInput);
    // console.log(rangeValue);

    const geocodedAddress = await getAddressGeocoded(addressInput);
    //valid address location to be in Singapore
    //check status==="OK"
    const searchData = { searchPoint: geocodedAddress.results[0] };

    return new NextResponse(JSON.stringify(searchData));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "failed to fetch any data" })
    );
  }
}
