"use client";

import { useState, useEffect, useRef } from "react";

//redux
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import {
  setOnHoverAtmPlaceId,
  setSelectedAtmPlaceId,
} from "@/features/atmData/atmDataSlice";

//components
import { IAtmObject } from "@/lib/atmObject";

//graphics
import daisyuiColors from "daisyui/src/theming/themes";
const cupcakeColours = daisyuiColors["[data-theme=cupcake]"];
const lightColours = daisyuiColors["[data-theme=light]"];
const nightColours = daisyuiColors["[data-theme=night]"];

type AtmMarkerProps = {
  atm: IAtmObject;
};

const AtmMarker = (props: AtmMarkerProps) => {
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

  const handleMouseOver = (over: boolean) => {
    if (storedBankFilters.includes(atm.brand)) return;
    dispatch(setOnHoverAtmPlaceId(over ? atm.place_id : null));
  };

  const handleClick = (id: string | null) => {
    if (storedBankFilters.includes(atm.brand)) return;
    dispatch(setSelectedAtmPlaceId(id));
  };

  /* const getCircleMarker = (): google.maps.Symbol => {
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
  }; */

  useEffect(() => {
    // if (markerRef.current) {
    //   markerRef.current.setIcon(getCircleMarker());
    //   markerRef.current.setZIndex(getZIndex());
    // }
  }, [storedHoveredAtmId, storedBankFilters]);

  return (
    <div
      className="border-2 rounded-full"
      onMouseOver={() => handleMouseOver(true)}
      onMouseOut={() => handleMouseOver(false)}
      onClick={() => handleClick(atm.place_id)}
    ></div>
  );
};

export default AtmMarker;
