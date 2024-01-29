import { NextRequest, NextResponse } from "next/server";
import {
  errorMessageQueue,
  errorMessageStrings,
  addToErrorMessageList,
  errorSeverity,
} from "@/lib/errors";
import { getWalkingDirections } from "@/features/googleAPI/directions";

export async function POST(req: NextRequest) {
  try {
    const { originLatLng, destinationPlaceId } = await req.json();

    let errorMessages: errorMessageQueue = [];

    // geocoding input address
    const directionsData = await getWalkingDirections(
      originLatLng,
      destinationPlaceId
    );
    switch (directionsData.status) {
      //failed to reach API
      case "INVALID_REQUEST" || "API error":
        errorMessages.push({
          message: errorMessageStrings.directionsAPIFailure,
          severity: errorSeverity.CRITICAL,
        });
        break;
      //no ATM results found
      case "ZERO_RESULTS":
        errorMessages.push({
          message: errorMessageStrings.noResultsFound,
          severity: errorSeverity.OK,
        });
        break;
      //cant find direction
      case "NOT_FOUND":
        errorMessages.push({
          message: errorMessageStrings.directionsDataFailure,
          severity: errorSeverity.CRITICAL,
        });
        break;
      //no errors
      case "OK":
        break;
      //other errors
      default:
        errorMessages.push({
          message: `Directions Error: ${directionsData.status}. ${
            directionsData.error_message || ""
          }`,
          severity: errorSeverity.CRITICAL,
        });
        break;
    }
    const resData = {
      directionsData,
      errorMessages,
    };

    return new NextResponse(JSON.stringify(resData));
  } catch (err) {
    // addToErrorMessageList(errorMessageStrings.directionsAPIFailure);

    let errorMessages: errorMessageQueue = [
      {
        message: errorMessageStrings.directionsAPIFailure,
        severity: errorSeverity.CRITICAL,
      },
    ];
    return new NextResponse(
      JSON.stringify({
        errorMessages,
      })
    );
  }
}
