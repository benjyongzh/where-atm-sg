"use client";

import { IAtmObject } from "@/lib/atmObject";

import { useAppSelector } from "@/hooks/reduxHooks";

import AtmListItem from "./AtmListItem";

const AtmList = () => {
  const mediaBreakpoint: string = useAppSelector(
    (state) => state.display.currentBreakpoint
  );

  const fullAtmList: IAtmObject[] = useAppSelector(
    (state) => state.atmData.allAtms
  );

  const storedBankFilters = useAppSelector(
    (state) => state.settings.bankFilterOut
  );

  const displayedAtms = fullAtmList
    .filter((atm: IAtmObject) => !storedBankFilters.includes(atm.brand))
    .map((atm: IAtmObject) => <AtmListItem key={atm.place_id} atmData={atm} />);

  return mediaBreakpoint === "xs" || fullAtmList.length < 1 ? null : (
    //TODO mobile view leads to errorMessageModal overlapping at top of atmList component
    //TODO atmList component has bottom shadowing cut off
    //TODO upon new search, atmList does not get cleared of previous search. should refresh list upon successful search
    // <div className="relative z-10 flex flex-col items-stretch h-min max-h-[30%] lg:max-h-auto lg:h-fit justify-end lg:w-[30%] max-w-5xl">
    <div className="relative z-10 flex flex-col items-stretch max-h-[30%] lg:max-h-none overflow-y-auto mt-auto lg:mt-0 lg:w-[30%] max-w-5xl">
      <div
        className={`flex flex-col items-center gap-2 h-full min-h-0 nav-bg ${
          fullAtmList.length > 0 ? "justify-start" : "justify-center"
        }`}
      >
        <div className="self-start px-2">
          {fullAtmList.length > 0 ? "Search results" : "No results found"}
        </div>
        {fullAtmList.length > 0 ? (
          <ul className="flex flex-col items-center justify-start w-full gap-3 overflow-y-auto rounded-xl">
            {displayedAtms}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default AtmList;
