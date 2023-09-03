import { IGeoCode } from "./geocoder";

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
    /* const res = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=place_id%3A${originPlaceId}&destination=place_id%3A${destinationPlaceId}&mode=walking&avoid=highways&key=${process.env.GMAPS_API_KEY}`
    ); */
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${originLatLng.lat}%2C${originLatLng.lng}&destination=place_id%3A${destinationPlaceId}&mode=walking&avoid=highways&key=${process.env.GMAPS_API_KEY}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(`Walking Directions error: `, err);
  }
}
