"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import AtmListItem from "./AtmListItem";
import { rawAtmInfo } from "@/lib/webscraping-data";

const AtmList = () => {
  const storedAtmData = useAppSelector((state) => state.atmData.allAtms);
  const storedFilters = useAppSelector((state) => state.settings.bankFilterOut);

  return (
    <ul className="flex flex-col flex-wrap w-full gap-2 p-5">
      {storedAtmData.map((atm: rawAtmInfo, index: number) =>
        storedFilters.includes(atm.brand) ? null : (
          <AtmListItem atmData={atm} key={index} />
        )
      )}
    </ul>
  );
};

export default AtmList;
