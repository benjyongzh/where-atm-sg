"use client";
import { useState } from "react";
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
  const [viewMode, setViewMode] = useState("List"); //"List" or "Map"
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
        location: atm.location,
        place_id: atm.place_id,
        address: atm.vicinity,
        distance,
      };
    })
    .filter((atm) => atm.distance! <= storedRange) //filter out ATMs further than filter distance
    .sort((atmA, atmB) => atmA.distance! - atmB.distance!) //sort from shortest distance to longest
    .map((atm: IAtmObject) => <AtmListItem key={atm.place_id} atmData={atm} />);

  const toggleViewMode = () => {
    viewMode === "List" ? setViewMode("Map") : setViewMode("List");
  };

  return (
    <div className="flex flex-col items-center justify-start w-full gap-6 section">
      <div
        className={`flex items-center ${
          fullAtmList.length ? "justify-between" : "justify-center"
        } w-full`}
      >
        {storedSearchPoint.lat === 0 && storedSearchPoint.lng === 0
          ? "Search for nearby ATMs"
          : fullAtmList.length
          ? fullAtmList.length === 1
            ? "1 ATM found nearby"
            : `${fullAtmList.length} ATMs found nearby`
          : "No ATMs found nearby"}
        {fullAtmList.length ? (
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="mr-3 label-text">{viewMode} View</span>
              <input
                type="checkbox"
                className="toggle toggle-md"
                checked={viewMode === "Map"}
                onClick={toggleViewMode}
              />
            </label>
          </div>
        ) : null}
      </div>
      {fullAtmList.length ? (
        viewMode === "List" ? (
          <ul className="flex flex-col items-center justify-start w-full gap-6">
            {finalList}
          </ul>
        ) : null //mapview here
      ) : null}
    </div>
  );
};

export default AtmList;
