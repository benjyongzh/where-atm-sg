"use client";

import { IAtmObject } from "@/lib/atmObject";

import { useAppSelector } from "@/hooks/reduxHooks";
import { useWindowDimensions } from "@/hooks/displayHooks";

import AtmListItem from "./AtmListItem";

const AtmList = () => {
  const mediaBreakpoint: string = useAppSelector(
    (state) => state.display.currentBreakpoint
  );

  const fullAtmList: IAtmObject[] = useAppSelector(
    (state) => state.atmData.allAtms
  );

  return mediaBreakpoint === "xs" ? null : (
    <ul className="absolute flex flex-col sm:items-center md:items-start justify-start gap-3 sm:w-full sm:h-[25%] md:w-[25%] md:h-full max-w-5xl">
      {fullAtmList.length > 0
        ? fullAtmList.map((atm: IAtmObject) => (
            <AtmListItem key={atm.place_id} atmData={atm} />
          ))
        : null}
    </ul>
  );
};

export default AtmList;
