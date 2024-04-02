"use client";

import { IAtmObject } from "@/app/_lib/atmObject";
import { arrayContainsAllContentsOfSecondArray } from "@/app/_utils/objects";

//redux
import { useAppSelector, useAppDispatch } from "@/app/_hooks/reduxHooks";
import { setSelectedAtmPlaceId } from "@/app/_features/atmData/atmDataSlice";
import {
  addBankFilter,
  removeBankFilter,
} from "@/app/_features/settings/settingsSlice";

//config
import { ATM_COUNT_DISPLAY_MAX } from "@/app/_config/app.config";

const FilterButton = (props: { banks: string[] }) => {
  const { banks } = props; //eg. ["DBS", "POSB"]
  const currentBankGroupEnabled: boolean = useAppSelector(
    (state) =>
      !arrayContainsAllContentsOfSecondArray(
        state.settings.bankFilterOut,
        banks
      )
  );
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

    if (currentBankGroupEnabled) {
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

    //setActivated((curr) => !curr);
  };

  return (
    <div
      className={`indicator mr-1 ${
        filterIsOpen || mediaBreakpoint !== "xs"
          ? "cursor-pointer"
          : "pointer-events-none cursor-default"
      }`}
    >
      {brandCount > 0 ? (
        <span className="p-3 rounded-full aspect-square indicator-item badge badge-secondary">
          {brandCount > ATM_COUNT_DISPLAY_MAX
            ? `${ATM_COUNT_DISPLAY_MAX}+`
            : brandCount}
        </span>
      ) : null}
      <button
        type="button"
        onClick={handleClick}
        className={`px-3 py-1 text-xs rounded-lg ${
          currentBankGroupEnabled ? "bg-info" : "bg-neutral-content"
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
