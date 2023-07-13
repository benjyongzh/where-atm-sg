"use client";

import { rawAtmInfo } from "@/lib/webscraping-data";
import { useAppSelector } from "@/hooks/reduxHooks";
import AtmListItem from "./AtmListItem";

const FilteredAtmList = (props: { fullAtmList: rawAtmInfo[] }) => {
  const storedFilters = useAppSelector((state) => state.settings.bankFilterOut);
  const { fullAtmList } = props;
  return (
    <ul className="flex flex-col flex-wrap w-full gap-2 p-5">
      {fullAtmList.map((atm: rawAtmInfo, index: number) =>
        storedFilters.includes(atm.brand) ? null : (
          <AtmListItem atmData={atm} key={index} />
        )
      )}
    </ul>
  );
};

export default FilteredAtmList;
