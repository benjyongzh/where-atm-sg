export interface IGeoCode {
  lat: number;
  lng: number;
}

// geocoder = new google.maps.Geocoder();

export async function getAddressGeocoded(address: string) {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GMAPS_API_KEY}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(`Geocoding error: `, err);
  }
}

export function getLatLongFromGeoCodeResult(res: any): IGeoCode {
  return {
    lat: res.geometry.location.lat,
    lng: res.geometry.location.lng,
  };
}
