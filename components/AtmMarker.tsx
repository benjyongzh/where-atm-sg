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

  useEffect(() => {
    // if (markerRef.current) {
    //   markerRef.current.setIcon(getCircleMarker());
    //   markerRef.current.setZIndex(getZIndex());
    // }
  }, [storedHoveredAtmId, storedBankFilters]);

  return (
    <div
      className={`aspect-square w-6 object-center rounded-full border-4 bg-opacity-80
      ${
        storedHoveredAtmId === atm.place_id
          ? "bg-secondary"
          : storedBankFilters.includes(atm.brand)
          ? "bg-neutral-content"
          : "bg-primary"
      } ${
        storedHoveredAtmId === atm.place_id ||
        storedSelectedAtmId === atm.place_id
          ? "scale-150"
          : "scale-100"
      } ${
        storedSelectedAtmId === atm.place_id
          ? "border-primary-content"
          : "border-white"
      } ${storedHoveredAtmId === atm.place_id ? "z-50" : ""}`}
      onMouseOver={() => handleMouseOver(true)}
      onMouseOut={() => handleMouseOver(false)}
      onClick={() => handleClick(atm.place_id)}
    ></div>
  );
};

export default AtmMarker;
