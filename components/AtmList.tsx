"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import {
  rawFetchedNearbyPlacesInfo,
  getBrandFromRawPlacesInfo,
  bankNameList,
} from "@/lib/atmObject";

const AtmList = () => {
  const storedRange = useAppSelector((state) => state.settings.maxRange);
  const fullAtmList: rawFetchedNearbyPlacesInfo[] = useAppSelector(
    (state) => state.atmData.allAtms
  );
  const storedBankFilter = useAppSelector(
    (state) => state.settings.bankFilterOut
  );

  const filteredAtmList = fullAtmList
    .filter((atm) => {
      const atmBrand = getBrandFromRawPlacesInfo(atm);
      return !storedBankFilter.includes(atmBrand);
    })
    .map((atm, i) => (
      <div key={i} className="flex items-center justify-center">
        {atm.vicinity}
      </div>
    ));

  return fullAtmList.length ? (
    <ul className="flex flex-col items-center justify-start w-full gap-6 p-5 section">
      {filteredAtmList}
    </ul>
  ) : (
    <div className="flex flex-col items-center justify-center w-full gap-6 p-5 section">
      No Atms Found
    </div>
  );
};

export default AtmList;
