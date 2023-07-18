import { IAtmObject } from "@/lib/atmObject";

import React, { useState, useCallback } from "react";
// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
  MarkerF,
  CircleF,
  InfoWindow,
} from "@react-google-maps/api";
import { IGeoCode } from "@/features/googleAPI/geocoder";

import { useAppSelector } from "@/hooks/reduxHooks";
import { getGMapsAPIKey } from "@/features/googleAPI/key";

import MapInfoWindowData from "./MapInfoWindowData";
import daisyuiColors from "daisyui/src/theming/themes";
const cupcakeColours = daisyuiColors["[data-theme=cupcake]"];

type GoogleMapsProps = {
  center: IGeoCode;
  atms: IAtmObject[];
};

// export default function GoogleMaps(props: GoogleMapsProps) {
//   const googleMapsApiKey = process.env.NEXT_PUBLIC_GMAPS_API_KEY;

//   if (googleMapsApiKey === undefined) {
//     return <div>Error. Invalid API key</div>;
//   }
//   return <Map googleMapsApiKey={googleMapsApiKey} atms={props.atms} />;
// }

// type MapProps = {
//   googleMapsApiKey: string;
//   atms: IAtmObject[];
// };

// function Map(props: MapProps) {
//   // infers type from default value
//   const center: IGeoCode = useAppSelector(
//     (state) => state.settings.searchLocationPoint
//   );
//   const storedRange = useAppSelector((state) => state.settings.maxRange);
//   const [selectedMarker, setSelectedMarker] = useState<IGeoCode | null>(center);
//   const { googleMapsApiKey, atms } = props;

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: googleMapsApiKey,
//   });
//   if (!isLoaded) return <div>Loading...</div>;

//   return (
//     <div className="mx-20 my-8 md:my-10">
//       <GoogleMap
//         zoom={10} //zoom integer setting
//         center={center}
//         mapContainerClassName="googlemap-container"
//       >
//         {/* center marking */}
//         {/* <MarkerF
//           position={center} //marker position
//           onClick={() => {
//             setSelectedMarker(center); //marker position
//           }}
//         >
//           {selectedMarker && (
//             <InfoWindow
//               onCloseClick={() => {
//                 setSelectedMarker(null);
//               }}
//               position={center} //marker position
//             >
//               <p>Directions</p>
//               <p>This is your input address</p>
//             </InfoWindow>
//           )}
//         </MarkerF> */}

//         {/* <CircleF
//           options={{
//             strokeColor: "hsl(var(--p))",
//             strokeOpacity: 0.7,
//             strokeWeight: 2,
//             fillColor: "hsl(var(--p))",
//             fillOpacity: 0.2,
//             clickable: false,
//             draggable: false,
//             editable: false,
//             visible: true,
//             zIndex: 1,
//           }}
//           center={center}
//           radius={storedRange}
//         ></CircleF> */}

//         {/* set atm locations across map */}
//         {atms.map((atm) => (
//           <MarkerF
//             position={atm.location} //marker position
//             onClick={() => {
//               setSelectedMarker(atm.location); //marker position
//             }}
//           >
//             {selectedMarker && (
//               <InfoWindow
//                 onCloseClick={() => {
//                   setSelectedMarker(null);
//                 }}
//                 position={atm.location} //marker position
//               >
//                 <p>{atm.brand}</p>
//                 <p>{atm.name}</p>
//                 <p>{atm.address}</p>
//                 <p>{atm.distance}m away</p>
//               </InfoWindow>
//             )}
//           </MarkerF>
//         ))}
//       </GoogleMap>
//     </div>
//   );
// }

const containerStyle = {
  width: "100%",
  height: "600px",
};

function GoogleMaps(props: GoogleMapsProps) {
  const storedRange = useAppSelector((state) => state.settings.maxRange);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCmclsT6YRYmtLnkWKpBml2CUEDa5-_jkk", //API key
  });
  const { atms, center } = props;
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const svgMarkerInRange = {
    path: "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z",
    fillColor: cupcakeColours.secondary,
    fillOpacity: 0.9,
    strokeWeight: 2,
    strokeColor: cupcakeColours.secondary,
    strokeOpacity: 1,
    scale: 2,
    anchor: new google.maps.Point(12, 21),
  };

  const svgMarkerOutOfRange = {
    path: "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z",
    fillColor: cupcakeColours.primary,
    fillOpacity: 0.6,
    strokeWeight: 2,
    strokeColor: cupcakeColours.primary,
    strokeOpacity: 1,
    scale: 2,
    anchor: new google.maps.Point(12, 21),
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}

      {/* center marking */}
      <CircleF
        options={{
          strokeColor: cupcakeColours.secondary,
          strokeOpacity: 0.7,
          strokeWeight: 2,
          fillColor: cupcakeColours.secondary,
          fillOpacity: 0.1,
          clickable: false,
          draggable: false,
          editable: false,
          visible: true,
          zIndex: 1,
        }}
        center={center}
        radius={storedRange}
      ></CircleF>

      {/* ATMs found */}
      {atms.map((atm) => (
        // <MapMarkerPin
        //   key={atm.place_id}
        //   atm={atm}
        //   selectedMarker={selectedMarker}
        //   handleClick={setSelectedMarker}
        // />
        <MarkerF
          position={atm.location} //marker position
          onClick={() => setSelectedMarker(atm.place_id)}
          icon={
            atm.distance <= storedRange ? svgMarkerInRange : svgMarkerOutOfRange
          }
          key={atm.place_id}
        >
          {selectedMarker === atm.place_id && (
            <InfoWindow
              onCloseClick={() => setSelectedMarker(null)}
              position={atm.location} //marker position
            >
              <MapInfoWindowData
                title={atm.brand}
                address={atm.address}
                distance={atm.distance}
                info={atm.info}
              />
            </InfoWindow>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  ) : (
    <div>Loading map...</div>
  );
}

export default React.memo(GoogleMaps);
