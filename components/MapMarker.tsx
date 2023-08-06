"use client";

import { useState, useEffect, useRef } from "react";

//redux
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import {
  setOnHoverAtmPlaceId,
  setSelectedAtmPlaceId,
} from "@/features/atmData/atmDataSlice";

//components
import { MarkerF, InfoWindow } from "@react-google-maps/api";
import { IAtmObject } from "@/lib/atmObject";
import MapInfoWindowData from "./MapInfoWindowData";

//graphics
import daisyuiColors from "daisyui/src/theming/themes";
const cupcakeColours = daisyuiColors["[data-theme=cupcake]"];
const lightColours = daisyuiColors["[data-theme=light]"];
const nightColours = daisyuiColors["[data-theme=night]"];

type MarkerProps = {
  atm: IAtmObject;
};

const MapMarker = (props: MarkerProps) => {
  const { atm } = props;
  const dispatch = useAppDispatch();
  const storedSelectedAtmId = useAppSelector(
    (state) => state.atmData.selectedAtmPlaceId
  );

  const storedHoveredAtmId = useAppSelector(
    (state) => state.atmData.onHoverAtmPlaceId
  );

  const storedBankFilters = useAppSelector(
    (state) => state.settings.bankFilterOut
  );

  const markerRef = useRef<google.maps.Marker | null>(null);
  const handleOnLoad = (markerInstance: google.maps.Marker) => {
    markerRef.current = markerInstance;
  };

  const handleMouseOver = (over: boolean) => {
    if (storedBankFilters.includes(atm.brand)) return;
    dispatch(setOnHoverAtmPlaceId(over ? atm.place_id : null));
  };

  const handleClick = (id: string | null) => {
    if (storedBankFilters.includes(atm.brand)) return;
    dispatch(setSelectedAtmPlaceId(id));
  };

  const getCircleMarker = (): google.maps.Symbol => {
    return {
      path: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
      fillColor: getMarkerColour(),
      fillOpacity: 0.9,
      strokeWeight: 5,
      strokeColor: getStrokeColor(),
      scale: getMarkerScale(),
      anchor: getMarkerAnchor(),
    };
  };

  const getStrokeColor = () => {
    return storedSelectedAtmId === atm.place_id ? "hsl(var(--pc))" : "white";
  };

  const getMarkerColour = () => {
    if (storedHoveredAtmId === atm.place_id) {
      return cupcakeColours.secondary;
    } else if (storedBankFilters.includes(atm.brand)) {
      return lightColours["neutral-content"];
    } else return cupcakeColours.primary;
  };

  const getMarkerScale = () => {
    return storedHoveredAtmId === atm.place_id ||
      storedSelectedAtmId === atm.place_id
      ? 2
      : 1.5;
  };

  const getMarkerAnchor = () => {
    return storedHoveredAtmId === atm.place_id ||
      storedSelectedAtmId === atm.place_id
      ? new google.maps.Point(12, 19.5)
      : new google.maps.Point(12, 21);
  };

  const getZIndex = () => {
    return storedHoveredAtmId === atm.place_id ? 99 : 11;
  };

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setIcon(getCircleMarker());
      markerRef.current.setZIndex(getZIndex());
    }
  }, [storedHoveredAtmId, storedBankFilters]);

  /* {
    path: "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z",
    fillColor: !storedBankFilters.includes(atm.brand)
      ? cupcakeColours.secondary
      : cupcakeColours.primary,
    fillOpacity: 0.9,
    strokeWeight: 2,
    strokeColor: !storedBankFilters.includes(atm.brand)
      ? nightColours.error
      : nightColours.info,
    scale: storedHoveredAtmId === atm.place_id ? 4 : 2,
    anchor: new google.maps.Point(12, 21),} */

  return (
    <MarkerF
      position={atm.location} //marker position
      onClick={() => handleClick(atm.place_id)}
      onLoad={handleOnLoad}
      icon={getCircleMarker()}
      key={atm.place_id}
      onMouseOver={() => handleMouseOver(true)}
      onMouseOut={() => handleMouseOver(false)}
      zIndex={getZIndex()}
    >
      {storedSelectedAtmId === atm.place_id && (
        <InfoWindow
          onCloseClick={() => handleClick(null)}
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
  );
};

export default MapMarker;
