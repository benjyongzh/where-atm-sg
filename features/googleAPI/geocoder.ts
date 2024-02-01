import { errorMessageStrings } from "@/lib/errors";

export interface IGeoCode {
  lat: number;
  lng: number;
}

// geocoder = new google.maps.Geocoder();

export async function getAddressGeocoded(address: string) {
  // console.log("start geocoding now");
  try {
    // console.log("try geocoding now");
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GMAPS_API_KEY}`
    );
    const data = await res.json();
    // console.log("Geocoding results:", data);
    return data;
  } catch (err) {
    // console.log(`Geocoding error: `, err);
    return {
      status: "API error",
      message: errorMessageStrings.geocodingAPIFailure,
    };
    // geocodedAddress.status !== "OK"
    // addToErrorMessageList(errorMessageStrings.geocodingAPIFailure);
  }
}

export function getLatLongFromGeoCodeResult(res: any): IGeoCode {
  return {
    lat: res.geometry.location.lat,
    lng: res.geometry.location.lng,
  };
}
