"use client";

import { IAtmObject } from "@/lib/atmObject";

import { useAppSelector } from "@/hooks/reduxHooks";

import AtmListItem from "./AtmListItem";

const AtmList = () => {
  const mediaBreakpoint: string = useAppSelector(
    (state) => state.display.currentBreakpoint
  );

  const searchStarted: boolean = useAppSelector(
    (state) => state.atmData.searchStarted
  );

  const fullAtmList: IAtmObject[] = useAppSelector(
    (state) => state.atmData.allAtms
  );

  return mediaBreakpoint === "xs" ? null : (
    <div className="relative z-20 flex items-start justify-stretch sm:max-h-[30%] lg:w-[30%] lg:max-h-screen max-w-5xl">
      <div className="flex flex-col items-center justify-start w-full gap-2 nav-bg">
        <div>
          {fullAtmList.length > 0 ? "Search results" : "No results found"}
        </div>
        {fullAtmList.length > 0 && (
          <ul className="flex flex-col items-center justify-start w-full gap-3 overflow-y-auto">
            {fullAtmList.map((atm: IAtmObject) => (
              <AtmListItem key={atm.place_id} atmData={atm} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AtmList;
