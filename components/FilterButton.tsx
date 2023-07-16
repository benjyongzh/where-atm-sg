"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import {
  addBankFilter,
  removeBankFilter,
} from "@/features/settings/settingsSlice";

import {
  rawFetchedNearbyPlacesInfo,
  getBrandFromRawPlacesInfo,
} from "@/lib/atmObject";

const FilterButton = (props: { name: string }) => {
  const [activated, setActivated] = useState(true);
  const dispatch = useAppDispatch();
  const fullAtmList: rawFetchedNearbyPlacesInfo[] = useAppSelector(
    (state) => state.atmData.allAtms
  );

  const brandCount = fullAtmList.filter((atm) => {
    const atmBrand = getBrandFromRawPlacesInfo(atm);
    return atmBrand === props.name;
  }).length;

  const handleClick = () => {
    activated
      ? dispatch(addBankFilter(props.name))
      : dispatch(removeBankFilter(props.name));
    setActivated((curr) => !curr);
  };

  return (
    <div className={`indicator ${brandCount > 0 ? "mr-3" : ""}`}>
      {brandCount > 0 ? (
        <span className="p-3 rounded-full aspect-square indicator-item badge badge-secondary">
          {brandCount}
        </span>
      ) : null}
      <button
        type="button"
        onClick={handleClick}
        className={`px-3 py-1 rounded-md ${
          activated ? "bg-info" : "bg-neutral-content"
        } `}
      >
        {props.name}
      </button>
    </div>
  );
};

export default FilterButton;
