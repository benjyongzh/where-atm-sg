import { IGeoCode } from "../settings/settingsSlice";

export async function getNearbyAtms(params: {
  searchPoint: IGeoCode;
  searchRadius: number;
  bank: string;
}) {
  const { searchPoint, searchRadius, bank } = params;
  const res = await getNearbyPlaces({
    searchPoint,
    searchRadius,
    buildingType: "atm",
    keyword: bank,
  });
  return res;
}

export async function getNearbyPlaces(params: {
  searchPoint: IGeoCode;
  searchRadius: number;
  buildingType: string;
  keyword?: string;
}) {
  const { searchPoint, searchRadius, buildingType, keyword } = params;
  const { lat, long } = searchPoint;
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${long}&radius=${searchRadius}&type=${buildingType}${
        keyword ? `&keyword=${keyword}` : ""
      }&key=${process.env.GMAPS_API_KEY}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    return {
      results: [],
      status: "FETCH_FAILED",
      error_message: "Could not reach API",
    };
  }
}
