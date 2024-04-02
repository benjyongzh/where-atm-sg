import { IGeoCode } from "./geocoder";
import { errorMessageStrings } from "@/app/_lib/errors";
import { IAtmObject, atmLoadingDirectionsFlag } from "@/app/_lib/atmObject";
import { isEmptyObj } from "@/app/_utils/objects";
// import { useAppStore } from "@/hooks/reduxHooks";

import {
  setParticularAtmData,
  setParticularAtmIsLoadingDirectionsFlag,
} from "../atmData/atmDataSlice";

export interface IDirections {
  originLatLng: IGeoCode;
  destinationPlaceId: string;
  mode: string; //walking by default
  distance: number; // in minutes
  duration: number; // in minutes
  pathPolyline: string;
}

export async function getWalkingDirections(
  originLatLng: IGeoCode,
  destinationPlaceId: string
) {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${originLatLng.lat}%2C${originLatLng.lng}&destination=place_id%3A${destinationPlaceId}&mode=walking&avoid=highways&key=${process.env.GMAPS_API_KEY}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    // addToErrorMessageList(errorMessageStrings.directionsAPIFailure);
    console.log(`Walking Directions error: `, err);
    return {
      status: "API error",
      message: errorMessageStrings.directionsAPIFailure,
    };
  }
}

export const handleUpdateDirections = async (
  originLatLng: IGeoCode,
  atm: IAtmObject,
  allAtmLoadingDirectionsFlags: Array<atmLoadingDirectionsFlag>,
  dispatchCallback: Function
) => {
  //guard clause
  // const store = useAppStore();
  // const allAtmDirectionFlags =
  //   store.getState().atmData.allAtmLoadingDirectionsFlags;
  const filteredAtmDirectionsFlag = allAtmLoadingDirectionsFlags.filter(
    (flagObject) => flagObject.atm.place_id === atm.place_id
  )[0];
  // console.log('flag:', filteredAtmDirectionsFlag)
  if (
    !isEmptyObj(atm.directions) ||
    filteredAtmDirectionsFlag.isLoadingDirections
  ) {
    return;
  }

  //start loading
  /* store.dispatch(
    setParticularAtmIsLoadingDirectionsFlag({ atm, isLoadingDirections: true })
  ); */
  dispatchCallback(
    setParticularAtmIsLoadingDirectionsFlag({ atm, isLoadingDirections: true })
  );

  //get data
  const directionsData = await handleGetDirections(originLatLng, atm.place_id);
  console.log("directions data from atmListItem: ", directionsData);

  //check for errors
  if (directionsData.status !== "OK") {
    dispatchCallback(
      setParticularAtmData({
        ...atm,
        directions: undefined,
      })
    );
    /* store.dispatch(
      setParticularAtmData({
        ...atm,
        directions: undefined,
      })
    ); */
  } else {
    //log distance into store
    const distance = getTotalWalkingDistanceMetres(directionsData);
    const duration = getTotalWalkingTimeMins(directionsData);
    dispatchCallback(
      setParticularAtmData({
        ...atm,
        directions: {
          originLatLng,
          destinationPlaceId: atm.place_id,
          mode: "walking",
          distance: distance, // in minutes
          duration: duration, // in minutes
          pathPolyline: "some polyline string",
        },
      })
    );
    /* store.dispatch(
      setParticularAtmData({
        ...atm,
        directions: {
          originLatLng,
          destinationPlaceId: atm.place_id,
          mode: "walking",
          distance: distance, // in minutes
          duration: duration, // in minutes
          pathPolyline: "some polyline string",
        },
      })
    ); */
  }

  /* store.dispatch(
    setParticularAtmIsLoadingDirectionsFlag({ atm, isLoadingDirections: false })
  ); */
  dispatchCallback(
    setParticularAtmIsLoadingDirectionsFlag({ atm, isLoadingDirections: false })
  );
};

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
  // console.log("handleGetDirections search result: ", result.directionsData);

  // if (!isErrorMessageObject(result)) {
  // overall fetching success
  // check for handled error messages
  // result.errorMessages.forEach((error: errorMessageObject) => {
  // console.log(`Client error message: `, error); //error message gotta show
  // });
  // } else {
  //fetching failed
  // console.log("Client fetching error: ", result.errorMessage); //error message gotta show
  // }
  return result.directionsData;
};

export const getTotalWalkingDistanceMetres = (
  data: google.maps.DirectionsResult
) => {
  let total = 0;
  const myroute = data.routes[0];

  if (!myroute) {
    //no directions
    return total;
  }

  for (let i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i]!.distance!.value;
  }

  return total;
};

export const getTotalWalkingTimeMins = (data: google.maps.DirectionsResult) => {
  let total = 0;
  const myroute = data.routes[0];

  if (!myroute) {
    //no directions
    return total;
  }

  for (let i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i]!.duration!.value;
  }

  return Math.ceil(total / 60);
};
