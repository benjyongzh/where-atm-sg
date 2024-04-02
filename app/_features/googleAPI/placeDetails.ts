export async function getPlaceDetails(id: string) {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name%2Cformatted_address%2Cgeometry%2Cplace_id%2Cname%2Caddress_components%2Curl&key=${process.env.GMAPS_API_KEY}`
    );

    const data = await res.json();
    return data;
  } catch (err) {
    return {
      results: [],
      status: "FETCH_FAILED",
      error_message: "Could not reach place details API",
    };
  }
}
