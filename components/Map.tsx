"use client";

import React, { useState, useEffect, useRef } from "react";

//redux
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { mapCenterDefault } from "@/features/settings/settingsSlice";
import {
  setOnHoverAtmPlaceId,
  setSelectedAtmPlaceId,
} from "@/features/atmData/atmDataSlice";

//lib/utils
import {handleUpdateDirections} from "@/features/googleAPI/directions";
import { IGeoCode } from "@/features/googleAPI/geocoder";
import { IAtmObject } from "@/lib/atmObject";

//components
import MapMarker from "./MapMarker";
import AtmMarker from "./AtmMarker";
import MapCircleDrawing from "./MapCircleDrawing";
import SearchpointMarker from "./SearchpointMarker";

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

  const handleAtmMarkerClick = (atm:IAtmObject) => {
    if (storedBankFilters.includes(atm.brand)) return;
    dispatch(setSelectedAtmPlaceId(atm.place_id));
    //load walking distance
    updateAtmDirections(atm);

  };

  const updateAtmDirections = (atm: IAtmObject) => {
    handleUpdateDirections(storedSearchPoint, atm);
  }

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
      mapId: process.env.NEXT_PUBLIC_GMAPS_MAP_ID_LIGHT,
    });
    newMap.addListener("click", handleMapClick);
    setMap(newMap);
  }, [mapRef]);

  return (
    <>
      <div id="mainMap" ref={mapRef} style={{ width: "100%", height: "100%" }}>
        {/* search point marking */}
        {searchStarted === true && map !== null ? (
          <MapMarker
            data={storedSearchPoint}
            map={map}
            position={storedSearchPoint}
            onClick={() => {}}
          >
            <SearchpointMarker />
          </MapMarker>
        ) : null}

        {/* search radius marking */}
        {searchStarted === true && map !== null ? (
          <MapCircleDrawing
            map={map}
            position={storedSearchPoint}
            radius={storedRange}
            onClick={() => {}}
          />
        ) : null}

        {/* ATMs being looked at */}
        {fullAtmList.map((atm) => (
          <MapMarker
            data={atm}
            key={atm.place_id}
            map={map}
            position={atm.location}
            onClick={() => handleAtmMarkerClick(atm)}
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
