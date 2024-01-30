import { errorMessageStrings } from "@/lib/errors";
import { IGeoCode } from "./geocoder";

export async function getNearbyAtms(params: {
  searchPoint: IGeoCode;
  searchRadius: number;
  bank?: string;
}) {
  const { searchPoint, searchRadius, bank = "" } = params;
  const res = await getNearbyPlaces({
    searchPoint,
    searchRadius,
    buildingType: "atm",
    keyword: bank,
  });
  return { bank, data: res };
}

export async function getNearbyPlaces(params: {
  searchPoint: IGeoCode;
  searchRadius: number;
  buildingType: string;
  keyword?: string;
}) {
  const { searchPoint, searchRadius, buildingType, keyword } = params;
  const { lat, lng } = searchPoint;
  try {
    //nearbySearch using rankby distance
    /* const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&type=${buildingType}${
        keyword ? `&keyword=${keyword}` : ""
      }&key=${process.env.GMAPS_API_KEY}&rankby=distance`
    ); */

    //nearbySearch using searchRadius
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=${searchRadius}&type=${buildingType}${
        keyword ? `&keyword=${keyword}` : ""
      }&key=${process.env.GMAPS_API_KEY}`
    );

    //findPlace
    /* const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${
        keyword
          ? `${keyword.toLowerCase()}%20${buildingType}`
          : `${buildingType}`
      }&inputtype=textquery&fields=formatted_address%2Cname%2Cgeometry%2Cplace_id&locationbias=circle%3A${searchRadius}%40${lat}%2C${lng}&key=${
        process.env.GMAPS_API_KEY
      }`
    ); */
    const data = await res.json();
    return data;
  } catch (err) {
    // addToErrorMessageList(errorMessageStrings.searchAPIFailure);
    return {
      status: "API error",
      message: [errorMessageStrings.searchAPIFailure],
    };
    // return {
    //   results: [],
    //   status: "FETCH_FAILED",
    //   error_message: "Could not reach nearby search API",
    // };
  }
}
