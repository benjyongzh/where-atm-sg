"use client";

import { useState } from "react";
import { IAtmObject } from "@/lib/atmObject";

//redux
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { setSelectedAtmPlaceId } from "@/features/atmData/atmDataSlice";
import {
  addBankFilter,
  removeBankFilter,
} from "@/features/settings/settingsSlice";

const FilterButton = (props: { banks: string[] }) => {
  const { banks } = props;
  const [activated, setActivated] = useState(true); //TODO should pair directly to store's bank filter info
  const dispatch = useAppDispatch();
  const fullAtmList: IAtmObject[] = useAppSelector(
    (state) => state.atmData.allAtms
  );
  const storedSelectedAtmId = useAppSelector(
    (state) => state.atmData.selectedAtmPlaceId
  );
  const filterIsOpen = useAppSelector((state) => state.settings.filterIsOpen);
  const mediaBreakpoint: string = useAppSelector(
    (state) => state.display.currentBreakpoint
  );

  const brandCount = fullAtmList.filter((atm) => {
    const atmBrand = atm.brand;
    return banks.includes(atmBrand);
  }).length;

  const handleClick = () => {
    if (!filterIsOpen && mediaBreakpoint === "xs") return;

    if (activated) {
      dispatch(addBankFilter(banks));
      if (storedSelectedAtmId !== null) {
        const currentAtm = fullAtmList.find(
          (atm) => atm.place_id === storedSelectedAtmId
        );
        if (currentAtm && banks.includes(currentAtm.brand))
          dispatch(setSelectedAtmPlaceId(null));
      }
    } else {
      dispatch(removeBankFilter(banks));
    }

    setActivated((curr) => !curr);
  };

  return (
    //TODO changing between mobile and desktop view alters the filter toggle status
    <div
      className={`indicator ${brandCount > 0 ? "mr-3" : ""} ${
        filterIsOpen || mediaBreakpoint !== "xs"
          ? "cursor-pointer"
          : "pointer-events-none cursor-default"
      }`}
    >
      {brandCount > 0 ? (
        <span className="p-3 rounded-full aspect-square indicator-item badge badge-secondary">
          {brandCount}
        </span>
      ) : null}
      <button
        type="button"
        onClick={handleClick}
        className={`px-3 py-1 text-xs rounded-lg ${
          activated ? "bg-info" : "bg-neutral-content"
        } ${
          filterIsOpen || mediaBreakpoint !== "xs"
            ? "cursor-pointer"
            : "cursor-default"
        }`}
        disabled={!filterIsOpen && mediaBreakpoint === "xs"}
      >
        {banks.join("/")}
      </button>
    </div>
  );
};

export default FilterButton;
