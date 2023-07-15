export interface IGeoCode {
  lat: number;
  long: number;
}

// geocoder = new google.maps.Geocoder();

export async function getAddressGeocoded(address: string) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GMAPS_API_KEY}`
  );
  const data = await res.json();
  return data;

  /* geocoder.geocode({ address: address }, function (results, status) {
    if (status == "OK") {
      console.log(results[0].geometry.location);
      // map.setCenter(results[0].geometry.location);
      //   var marker = new google.maps.Marker({
      //       map: map,
      //       position: results[0].geometry.location
      //   });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  }); */
}

export function getLatLongFromGeoCodeResult(res: any): IGeoCode {
  return {
    lat: res.geometry.location.lat,
    long: res.geometry.location.lng,
  };
}
