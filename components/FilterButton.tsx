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
  IAtmObject,
} from "@/lib/atmObject";

const FilterButton = (props: { banks: string[] }) => {
  const { banks } = props;
  const [activated, setActivated] = useState(true);
  const dispatch = useAppDispatch();
  const fullAtmList: IAtmObject[] = useAppSelector(
    (state) => state.atmData.allAtms
  );
  const filterIsOpen = useAppSelector((state) => state.settings.filterIsOpen);

  const brandCount = fullAtmList.filter((atm) => {
    const atmBrand = atm.brand;
    return banks.includes(atmBrand);
  }).length;

  const handleClick = () => {
    if (filterIsOpen) {
      activated
        ? dispatch(addBankFilter(banks))
        : dispatch(removeBankFilter(banks));
      setActivated((curr) => !curr);
    }
  };

  return (
    <div
      className={`indicator ${brandCount > 0 ? "mr-3" : ""} ${
        filterIsOpen ? "cursor-pointer" : "pointer-events-none cursor-default"
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
        } ${filterIsOpen ? "cursor-pointer" : "cursor-default"}`}
        disabled={!filterIsOpen}
      >
        {banks.join("/")}
      </button>
    </div>
  );
};

export default FilterButton;
