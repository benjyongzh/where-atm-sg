"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  CircleF,
  InfoWindow,
} from "@react-google-maps/api";

//redux
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { setSelectedAtmPlaceId } from "@/features/atmData/atmDataSlice";
import { mapCenterDefault } from "@/features/settings/settingsSlice";
import { getGMapsAPIKey } from "@/features/googleAPI/key";

//daisyUI
import MapInfoWindowData from "./MapInfoWindowData";
import daisyuiColors from "daisyui/src/theming/themes";
const cupcakeColours = daisyuiColors["[data-theme=cupcake]"];
const lightColours = daisyuiColors["[data-theme=light]"];
const nightColours = daisyuiColors["[data-theme=night]"];

//lib/utils
import { IGeoCode } from "@/features/googleAPI/geocoder";
import {
  IAtmObject,
  rawFetchedNearbyPlacesInfo,
  getBrandFromRawPlacesInfo,
} from "@/lib/atmObject";
import { haversine_distance } from "@/utils/distance";

type GoogleMapsProps = {
  center: IGeoCode;
  atms: IAtmObject[];
  selectAtm: Function;
  selectedAtmId: string | null;
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

function GoogleMaps() {
  //redux
  const dispatch = useAppDispatch();
  const storedRange = useAppSelector((state) => state.settings.maxRange);
  const storedSelectedAtmId = useAppSelector(
    (state) => state.atmData.selectedAtmPlaceId
  );
  const fullAtmList: rawFetchedNearbyPlacesInfo[] = useAppSelector(
    (state) => state.atmData.allAtms
  );
  const storedBankFilter = useAppSelector(
    (state) => state.settings.bankFilterOut
  );
  const storedSearchPoint: IGeoCode = useAppSelector(
    (state) => state.settings.searchLocationPoint
  );

  //states
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY!, //API key
  });
  // const { atms, center, selectAtm, selectedAtmId } = props;
  const [map, setMap] = useState(null);
  const [mapCenterPoint, setMapCenterPoint] =
    useState<IGeoCode>(mapCenterDefault);

  const zoomIndex = 15;

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(mapCenterDefault);
    // map.fitBounds(bounds);
    map.setZoom(zoomIndex);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const svgMarkerInRange = isLoaded
    ? {
        path: "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z",
        fillColor: cupcakeColours.primary,
        fillOpacity: 0.9,
        strokeWeight: 2,
        strokeColor: nightColours.info,
        scale: 2,
        anchor: new google.maps.Point(12, 21),
      }
    : undefined;

  const svgMarkerOutOfRange = isLoaded
    ? {
        path: "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z",
        fillColor: cupcakeColours.secondary,
        fillOpacity: 0.9,
        strokeWeight: 2,
        strokeColor: nightColours.error,
        scale: 2,
        anchor: new google.maps.Point(12, 21),
      }
    : undefined;

  const filteredAtmList = fullAtmList
    .map((atm: rawFetchedNearbyPlacesInfo): IAtmObject => {
      const atmBrand = getBrandFromRawPlacesInfo(atm);

      // log distances from each ATM
      const distance = haversine_distance(storedSearchPoint, atm.location);
      return {
        brand: atmBrand,
        name: atm.name,
        location: atm.location,
        place_id: atm.place_id,
        address: atm.vicinity,
        distance,
      };
    })
    .filter((atm: IAtmObject): boolean => {
      return !storedBankFilter.includes(atm.brand) && atm.brand !== "";
    })
    .filter((atm) => atm.distance <= storedRange) //only use ATMs in range
    .sort((atmA, atmB) => atmA.distance! - atmB.distance!); //sort from shortest distance to longest

  const handleSelectAtmMarker = (atm: IAtmObject | null) => {
    if (atm === null) {
      dispatch(setSelectedAtmPlaceId(null));
    } else {
      dispatch(setSelectedAtmPlaceId(atm.place_id));
    }
  };

  useEffect(() => {
    if (storedSelectedAtmId !== null) {
      const atmsInFocus = filteredAtmList.filter(
        (atm) => atm.place_id === storedSelectedAtmId
      );
      if (atmsInFocus.length) setMapCenterPoint(atmsInFocus[0].location);
    }
  }, [storedSelectedAtmId]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%",
      }}
      center={mapCenterPoint}
      zoom={zoomIndex}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        gestureHandling: "greedy",
        disableDefaultUI: true,
        streetViewControl: false,
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}

      {/* center marking */}
      <CircleF
        options={{
          strokeColor: cupcakeColours.primary,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: cupcakeColours.primary,
          fillOpacity: 0.1,
          clickable: false,
          draggable: false,
          editable: false,
          visible: true,
          zIndex: 1,
        }}
        center={storedSearchPoint}
        radius={storedRange}
      ></CircleF>

      {/* ATMs found */}
      {filteredAtmList.map((atm) => (
        <MarkerF
          position={atm.location} //marker position
          onClick={() => handleSelectAtmMarker(atm)}
          icon={
            atm.distance <= storedRange ? svgMarkerInRange : svgMarkerOutOfRange
          }
          key={atm.place_id}
        >
          {storedSelectedAtmId === atm.place_id && (
            <InfoWindow
              onCloseClick={() => handleSelectAtmMarker(null)}
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
