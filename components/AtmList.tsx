"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import {
  rawFetchedNearbyPlacesInfo,
  getBrandFromRawPlacesInfo,
  IAtmObject,
} from "@/lib/atmObject";

import AtmListItem from "./AtmListItem";

const AtmList = () => {
  const storedRange = useAppSelector((state) => state.settings.maxRange);
  const fullAtmList: rawFetchedNearbyPlacesInfo[] = useAppSelector(
    (state) => state.atmData.allAtms
  );
  const storedBankFilter = useAppSelector(
    (state) => state.settings.bankFilterOut
  );

  const finalList = fullAtmList
    .filter((atm: rawFetchedNearbyPlacesInfo) => {
      const atmBrand = getBrandFromRawPlacesInfo(atm);
      return !storedBankFilter.includes(atmBrand) && atmBrand !== "";
    })
    .map((atm: rawFetchedNearbyPlacesInfo) => {
      const atmBrand = getBrandFromRawPlacesInfo(atm);
      return {
        brand: atmBrand,
        name: atm.name,
        place_id: atm.place_id,
        address: atm.vicinity,
      }; // need to get distance and info
    })
    .map((atm: IAtmObject) => <AtmListItem key={atm.place_id} atmData={atm} />);

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
