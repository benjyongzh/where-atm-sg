export interface IDirections {
  originPlaceId: string;
  destinationPlaceId: string;
  mode: string; //walking by default
  duration: number; // in minutes
  pathPolyline: string;
}

export async function getWalkingDirections(
  originPlaceId: string,
  destinationPlaceId: string
) {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?destination=place_id%3A${originPlaceId}&origin=place_id%3A${destinationPlaceId}&mode=walking&avoid=highways&key=${process.env.GMAPS_API_KEY}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(`Walking Directions error: `, err);
  }
}
