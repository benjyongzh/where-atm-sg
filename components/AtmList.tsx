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
    <div className="flex flex-col items-center justify-start w-full gap-6 section">
      <div className="flex items-center justify-center w-full">
        {finalList.length
          ? `${finalList.length} ATMs found within ${storedRange}m`
          : "No ATMs found"}
      </div>
      {fullAtmList.length ? (
        <ul className="flex flex-col items-center justify-start w-full gap-4">
          {finalList}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default AtmList;
