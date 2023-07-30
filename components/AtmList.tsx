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
    <ul className="z-20 absolute sm:bottom-0 lg:left-0 flex flex-col sm:items-center lg:items-start justify-start gap-3 sm:w-full sm:h-[35%] lg:w-[25%] lg:h-full max-w-5xl nav-bg p-5 overflow-y-auto">
      {fullAtmList.length > 0
        ? fullAtmList.map((atm: IAtmObject) => (
            <AtmListItem key={atm.place_id} atmData={atm} />
          ))
        : "No search results"}
    </ul>
  );
};

export default AtmList;
