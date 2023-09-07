import { IGeoCode } from "./geocoder";
import { errorMessageObject, isErrorMessageObject } from "@/lib/errors";

export interface IDirections {
  originLatLng: IGeoCode;
  destinationPlaceId: string;
  mode: string; //walking by default
  duration: number; // in minutes
  pathPolyline: string;
}

export async function getWalkingDirections(
  originLatLng: IGeoCode,
  destinationPlaceId: string
) {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${originLatLng.lat}%2C${originLatLng.lng}&destination=place_id%3A${destinationPlaceId}&mode=walking&avoid=highways&key=${process.env.NEXT_PUBLIC_GMAPS_API_KEY}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(`Walking Directions error: `, err);
  }
}

export const handleGetDirections = async (
  originLatLng: IGeoCode,
  destinationPlaceId: string
) => {
  //should validate and sanitize addressInput string here first
  const endpoint = "/api/directions";

  // Form the request for sending data to the server.
  const options = {
    // The method is POST because we are sending data.
    method: "POST",
    // Tell the server we're sending JSON.
    headers: {
      "Content-Type": "application/json",
    },
    // Body of the request is the JSON data we created above.
    body: JSON.stringify({
      originLatLng,
      destinationPlaceId,
    }),
  };

  // Send the form data to our forms API on Vercel and get a response.
  const response = await fetch(endpoint, options);

  // Get the response data from server as JSON.
  // If server returns the name submitted, that means the form works.
  const result = await response.json();
  console.log("directions search result: ", result);

  if (!isErrorMessageObject(result)) {
    // overall fetching success
    // check for handled error messages
    result.errorMessages.forEach((error: errorMessageObject) => {
      console.log(`Client error message: `, error); //error message gotta show
    });
  } else {
    //fetching failed
    console.log("Client fetching error: ", result.errorMessage); //error message gotta show
  }
};
