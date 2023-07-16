"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import {
  rawFetchedNearbyPlacesInfo,
  getBrandFromRawPlacesInfo,
  IAtmObject,
} from "@/lib/atmObject";

import AtmListItem from "./AtmListItem";
import { IGeoCode } from "@/features/googleAPI/geocoder";
import { haversine_distance } from "@/utils/distance";

const AtmList = () => {
  const storedRange = useAppSelector((state) => state.settings.maxRange);
  const storedSearchPoint: IGeoCode = useAppSelector(
    (state) => state.settings.searchLocationPoint
  );

  const fullAtmList: rawFetchedNearbyPlacesInfo[] = useAppSelector(
    (state) => state.atmData.allAtms
  );
  const storedBankFilter = useAppSelector(
    (state) => state.settings.bankFilterOut
  );

  const finalList = fullAtmList
    .filter((atm: rawFetchedNearbyPlacesInfo): boolean => {
      const atmBrand = getBrandFromRawPlacesInfo(atm);
      return !storedBankFilter.includes(atmBrand) && atmBrand !== "";
    })
    .map((atm: rawFetchedNearbyPlacesInfo): IAtmObject => {
      const atmBrand = getBrandFromRawPlacesInfo(atm);

      // log distances from each ATM
      const distance = haversine_distance(storedSearchPoint, atm.location);
      return {
        brand: atmBrand,
        name: atm.name,
        place_id: atm.place_id,
        address: atm.vicinity,
        distance,
      };
    })
    .filter((atm) => atm.distance! <= storedRange) //filter out ATMs further than filter distance
    .sort((atmA, atmB) => atmA.distance! - atmB.distance!) //sort from shortest distance to longest
    .map((atm: IAtmObject) => <AtmListItem key={atm.place_id} atmData={atm} />);

  return (
    <div className="flex flex-col items-center justify-start w-full gap-6 mt-4 section">
      <div className="flex items-center justify-center w-full">
        {storedSearchPoint.lat === 0 && storedSearchPoint.long === 0
          ? "Search for nearby ATMs"
          : fullAtmList.length
          ? fullAtmList.length === 1
            ? "1 ATM found nearby"
            : `${fullAtmList.length} ATMs found nearby`
          : "No ATMs found nearby"}
      </div>
      {fullAtmList.length ? (
        <ul className="flex flex-col items-center justify-start w-full gap-6">
          {finalList}
        </ul>
      ) : null}
    </div>
  );
};

export default AtmList;
