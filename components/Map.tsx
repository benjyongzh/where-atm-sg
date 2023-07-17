// "use client";

import { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  CircleF,
  InfoWindow,
} from "@react-google-maps/api";
import { IGeoCode } from "@/features/googleAPI/geocoder";
import { IAtmObject } from "@/lib/atmObject";

import GoogleMapReact from "google-map-react";

import { useAppSelector } from "@/hooks/reduxHooks";

type MapProps = {
  atms: IAtmObject[];
  zoom: number;
};

// export default function Map(props: MapProps) {
//   // infers type from default value
//   const center: IGeoCode = useAppSelector(
//     (state) => state.settings.searchLocationPoint
//   );
//   const storedRange = useAppSelector((state) => state.settings.maxRange);
//   const [selectedMarker, setSelectedMarker] = useState<IGeoCode | null>(center);
//   const { atms } = props;
//   return (
//     <div className="mx-20 my-8 md:my-10">
//       <GoogleMap
//         zoom={10} //zoom integer setting
//         center={center}
//         mapContainerClassName="googlemap-container"
//       >
//         {/* center marking */}
//         <MarkerF
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
//         </MarkerF>

//         <CircleF
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
//         ></CircleF>

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

export default function Map(props: MapProps) {
  const center: IGeoCode = useAppSelector(
    (state) => state.settings.searchLocationPoint
  );
  const storedRange = useAppSelector((state) => state.settings.maxRange);
  // const [selectedMarker, setSelectedMarker] = useState<IGeoCode | null>(center);
  const { atms, zoom } = props;
  return (
    // Important! Always set the container height explicitly
    <div className="w-full h-60">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {/* <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" /> */}
      </GoogleMapReact>
    </div>
  );
}
