"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";

//redux
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { mapCenterDefault } from "@/features/settings/settingsSlice";
import {
  setOnHoverAtmPlaceId,
  setSelectedAtmPlaceId,
} from "@/features/atmData/atmDataSlice";

//daisyUI
import daisyuiColors from "daisyui/src/theming/themes";
const cupcakeColours = daisyuiColors["[data-theme=cupcake]"];
const lightColours = daisyuiColors["[data-theme=light]"];
const nightColours = daisyuiColors["[data-theme=night]"];

//lib/utils
import { IGeoCode } from "@/features/googleAPI/geocoder";
import { IAtmObject } from "@/lib/atmObject";
import MapMarker from "./MapMarker";
import { Marker } from "@react-google-maps/api";
import AtmMarker from "./AtmMarker";
import RadiusMarker from "./RadiusMarker";

export default function Map() {
  //redux
  const dispatch = useAppDispatch();
  const storedRange = useAppSelector((state) => state.settings.maxRange);
  const storedSelectedAtmId = useAppSelector(
    (state) => state.atmData.selectedAtmPlaceId
  );
  const storedHoveredAtmId = useAppSelector(
    (state) => state.atmData.onHoverAtmPlaceId
  );

  const storedBankFilters = useAppSelector(
    (state) => state.settings.bankFilterOut
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

  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const initialZoom = currentBreakpoint === "xs" ? 10 : 11;

  const handleAtmMarkerMouseOver = (
    over: boolean,
    brand: string,
    id: string
  ) => {
    // console.log("something is moused over");
    if (storedBankFilters.includes(brand)) return;
    dispatch(setOnHoverAtmPlaceId(over ? id : null));
  };

  const handleAtmMarkerClick = (id: string | null, brand: string) => {
    // console.log("something is  clicked");
    if (storedBankFilters.includes(brand)) return;
    dispatch(setSelectedAtmPlaceId(id));
  };

  useEffect(() => {
    if (storedSelectedAtmId !== null) {
      const atmsInFocus = fullAtmList.filter(
        (atm) => atm.place_id === storedSelectedAtmId
      );
      if (atmsInFocus.length) mapLookAt(atmsInFocus[0].location);
    }
  }, [storedSelectedAtmId]);

  useEffect(() => {
    mapLookAt(storedSearchPoint);
    mapFitFilteredAtms();
  }, [storedSearchPoint]);

  const mapLookAt = (point: IGeoCode) => {
    /* console.log(point);
    console.log(map); */
    if (map) map.panTo(point);
  };

  const mapFitFilteredAtms = () => {
    if (!map) return;
    if (fullAtmList.length < 1) {
      map.setZoom(initialZoom + 4);
      return;
    }
    const bounds = new google.maps.LatLngBounds();
    fullAtmList.forEach((atm) => bounds.extend(atm.location));
    map.fitBounds(bounds);
  };

  const handleMapClick = (
    event: google.maps.IconMouseEvent | google.maps.MapMouseEvent
  ) => {
    event.stop();
    if (!event.placeId) {
      dispatch(setSelectedAtmPlaceId(null));
    } else {
      const selectedPlaceId = fullAtmList.find(
        (atm) => atm.place_id === event.placeId
      );
      if (!selectedPlaceId) {
        dispatch(setSelectedAtmPlaceId(null));
      }
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;
    const newMap: google.maps.Map = new window.google.maps.Map(mapRef.current, {
      center: mapCenterDefault,
      zoom: initialZoom,
      disableDefaultUI: true,
      gestureHandling: "greedy",
      streetViewControl: false,
      mapId: "DEMO_MAP_ID",
    });
    newMap.addListener("click", handleMapClick);
    setMap(newMap);
  }, [mapRef]);

  return (
    <>
      <div id="mainMap" ref={mapRef} style={{ width: "100%", height: "100%" }}>
        {/* center marking */}
        {/* {searchStarted === true ? (
          <CircleF
            options={{
              strokeColor: "white",
              strokeOpacity: 0.8,
              strokeWeight: 3,
              fillColor: cupcakeColours["base-content"],
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
        ) : null} */}
        <MapMarker
          data={{ storedSearchPoint, storedRange }}
          map={map}
          position={storedSearchPoint}
          onClick={() => {}}
        >
          <RadiusMarker
            center={storedSearchPoint}
            radius={storedRange}
            map={map}
          />
        </MapMarker>

        {/* ATMs being looked at */}
        {fullAtmList.map((atm) => (
          <MapMarker
            data={atm}
            key={atm.place_id}
            map={map}
            position={atm.location}
            onClick={() => handleAtmMarkerClick(atm.place_id, atm.brand)}
          >
            <AtmMarker
              atm={atm}
              onMouseOver={handleAtmMarkerMouseOver}
              onMouseOut={handleAtmMarkerMouseOver}
              storedHoveredAtmId={storedHoveredAtmId}
              storedSelectedAtmId={storedSelectedAtmId}
              storedBankFilters={storedBankFilters}
            />
          </MapMarker>
        ))}
      </div>
    </>
  );
}
