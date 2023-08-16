"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";

//redux
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { mapCenterDefault } from "@/features/settings/settingsSlice";
import { setSelectedAtmPlaceId } from "@/features/atmData/atmDataSlice";

//daisyUI
import daisyuiColors from "daisyui/src/theming/themes";
const cupcakeColours = daisyuiColors["[data-theme=cupcake]"];
const lightColours = daisyuiColors["[data-theme=light]"];
const nightColours = daisyuiColors["[data-theme=night]"];

//lib/utils
import { IGeoCode } from "@/features/googleAPI/geocoder";
import { IAtmObject } from "@/lib/atmObject";
import MapMarker from "./MapMarker";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_GMAPS_API_KEY;

  //redux
  const dispatch = useAppDispatch();
  const storedRange = useAppSelector((state) => state.settings.maxRange);
  const storedSelectedAtmId = useAppSelector(
    (state) => state.atmData.selectedAtmPlaceId
  );
  const fullAtmList: IAtmObject[] = useAppSelector(
    (state) => state.atmData.allAtms
  );
  const storedSearchPoint: IGeoCode = useAppSelector(
    (state) => state.settings.searchLocationPoint
  );
  const searchStarted: boolean = useAppSelector(
    (state) => state.atmData.searchStarted
  );
  const currentBreakpoint: string = useAppSelector(
    (state) => state.display.currentBreakpoint
  );

  // const onLoad = useCallback(function callback(map: any) {
  //   // const bounds = new window.google.maps.LatLngBounds(mapCenterDefault);
  //   // map.fitBounds(bounds);
  //   map.setZoom(initialZoom);
  //   setMap(map);
  // }, []);

  // const onUnmount = useCallback(function callback(map: any) {
  //   setMap(null);
  // }, []);

  // useEffect(() => {
  //   if (storedSelectedAtmId !== null) {
  //     const atmsInFocus = fullAtmList.filter(
  //       (atm) => atm.place_id === storedSelectedAtmId
  //     );
  //     if (atmsInFocus.length) mapLookAt(atmsInFocus[0].location);
  //   }
  // }, [storedSelectedAtmId]);

  // useEffect(() => {
  //   mapLookAt(storedSearchPoint);
  //   mapFitFilteredAtms();
  // }, [storedSearchPoint]);

  // const mapLookAt = (point: IGeoCode) => {
  //   /* console.log(point);
  //   console.log(map); */
  //   if (map) map.panTo(point);
  // };

  // const mapFitFilteredAtms = () => {
  //   if (!isLoaded) return;
  //   if (fullAtmList.length < 1) {
  //     map.setZoom(initialZoom + 4);
  //     return;
  //   }
  //   const bounds = new google.maps.LatLngBounds();
  //   fullAtmList.forEach((atm) => bounds.extend(atm.location));
  //   map.fitBounds(bounds);
  // };

  // const handleMapClick = (
  //   event: google.maps.IconMouseEvent | google.maps.MapMouseEvent
  // ) => {
  //   event.stop();
  //   if (!event.placeId) {
  //     dispatch(setSelectedAtmPlaceId(null));
  //   } else {
  //     const selectedPlaceId = fullAtmList.find(
  //       (atm) => atm.place_id === event.placeId
  //     );
  //     if (!selectedPlaceId) {
  //       dispatch(setSelectedAtmPlaceId(null));
  //     }
  //   }
  // };

  // const marker = new google.maps.marker.AdvancedMarkerElement({
  //   map,
  //   position: storedSearchPoint,
  // });

  // if (!isLoaded) {
  //   return (
  //     <div className="flex items-center justify-center w-full h-full gap-3">
  //       <span>Loading map</span>
  //       <span className="loading loading-dots loading-md"></span>
  //     </div>
  //   );
  // }

  //states

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const initialZoom = currentBreakpoint === "xs" ? 10 : 11;

  useEffect(() => {
    setMap(
      new window.google.maps.Map(mapRef.current, {
        center: mapCenterDefault,
        zoom: initialZoom,
        disableDefaultUI: true,
      })
    );
  }, []);

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </>
  );

  // return (
  //   <GoogleMap
  //     mapContainerStyle={{
  //       width: "100%",
  //       height: "100%",
  //     }}
  //     center={mapCenterDefault}
  //     zoom={initialZoom}
  //     onLoad={onLoad}
  //     onUnmount={onUnmount}
  //     options={{
  //       gestureHandling: "greedy",
  //       disableDefaultUI: true,
  //       streetViewControl: false,
  //     }}
  //     onClick={handleMapClick}
  //   >
  //     {/* center marking */}
  //     {searchStarted === true ? (
  //       <CircleF
  //         options={{
  //           strokeColor: "white",
  //           strokeOpacity: 0.8,
  //           strokeWeight: 3,
  //           fillColor: cupcakeColours["base-content"],
  //           fillOpacity: 0.1,
  //           clickable: false,
  //           draggable: false,
  //           editable: false,
  //           visible: true,
  //           zIndex: 1,
  //         }}
  //         center={storedSearchPoint}
  //         radius={storedRange}
  //       ></CircleF>
  //     ) : null}

  //     {/* ATMs being looked at */}
  //     {fullAtmList.map(
  //       (atm) => isLoaded && <MapMarker atm={atm} key={atm.place_id} />
  //     )}
  //   </GoogleMap>
  // );
}
