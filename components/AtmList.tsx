"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import {
  rawFetchedNearbyPlacesInfo,
  getBrandFromRawPlacesInfo,
} from "@/lib/atmObject";

const AtmList = () => {
  const storedRange = useAppSelector((state) => state.settings.maxRange);
  const fullAtmList: rawFetchedNearbyPlacesInfo[] = useAppSelector(
    (state) => state.atmData.allAtms
  );
  const storedBankFilter = useAppSelector(
    (state) => state.settings.bankFilterOut
  );

  const finalList = fullAtmList
    .filter((atm) => {
      const atmBrand = getBrandFromRawPlacesInfo(atm);
      return !storedBankFilter.includes(atmBrand) && atmBrand !== "";
    })
    .map((atm) => {
      const atmBrand = getBrandFromRawPlacesInfo(atm);
      return { brand: atmBrand, name: atm.name, address: atm.vicinity }; // need to get distance and info
    })
    .map((atm, index) => (
      <div
        className="flex flex-col justify-center w-full item-start"
        key={index}
      >
        <div>{atm.brand}</div>
        <div>{atm.name}</div>
        <div>{atm.address}</div>
      </div>
    ));

  return fullAtmList.length ? (
    <ul className="flex flex-col items-center justify-start w-full gap-6 p-5 section">
      {finalList}
    </ul>
  ) : (
    <div className="flex flex-col items-center justify-center w-full gap-6 p-5 section">
      No Atms Found
    </div>
  );
};

export default AtmList;
