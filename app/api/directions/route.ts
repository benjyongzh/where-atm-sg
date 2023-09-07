import { NextRequest, NextResponse } from "next/server";
import { errorMessageObject } from "@/lib/errors";
import { getWalkingDirections } from "@/features/googleAPI/directions";

export async function POST(req: NextRequest) {
  try {
    const { originLatLng, destinationPlaceId } = await req.json();

    let errorMessages: errorMessageObject[] = [];

    // geocoding input address
    const directionsData = await getWalkingDirections(
      originLatLng,
      destinationPlaceId
    );
    if (directionsData.status !== "OK") {
      errorMessages.push({
        errorMessage: `Directions Error: ${directionsData.status}. ${
          directionsData.error_message || ""
        }`,
      });
    }
    const resData = {
      directionsData,
      errorMessages,
    };

    return new NextResponse(JSON.stringify(resData));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        errorMessage: "failed to fetch directions data, " + err,
      })
    );
  }
}
