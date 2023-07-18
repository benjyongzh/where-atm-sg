"use client";
import { useState } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import {
  rawFetchedNearbyPlacesInfo,
  getBrandFromRawPlacesInfo,
  IAtmObject,
} from "@/lib/atmObject";

import AtmListItem from "./AtmListItem";
import GoogleMaps from "./GoogleMap";
import Map from "./Map";
import { IGeoCode } from "@/features/googleAPI/geocoder";
import { haversine_distance } from "@/utils/distance";

const AtmList = () => {
  const [viewMode, setViewMode] = useState("List"); //"List" or "Map"
  const storedRange = useAppSelector((state) => state.settings.maxRange);
  const [selectedAtmId, setselectedAtmId] = useState<string | null>(null);
  const storedSearchPoint: IGeoCode = useAppSelector(
    (state) => state.settings.searchLocationPoint
  );

  const fullAtmList: rawFetchedNearbyPlacesInfo[] = useAppSelector(
    (state) => state.atmData.allAtms
  );
  const storedBankFilter = useAppSelector(
    (state) => state.settings.bankFilterOut
  );

  const convertedAtmList = fullAtmList.map(
    (atm: rawFetchedNearbyPlacesInfo): IAtmObject => {
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
    }
  );

  const filteredAtmList = fullAtmList
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
    .filter((atm: IAtmObject): boolean => {
      return !storedBankFilter.includes(atm.brand) && atm.brand !== "";
    })
    .filter((atm) => atm.distance <= storedRange) //only use ATMs in range
    .sort((atmA, atmB) => atmA.distance! - atmB.distance!); //sort from shortest distance to longest

  const toggleViewMode = () => {
    viewMode === "List" ? setViewMode("Map") : setViewMode("List");
  };

  return (
    <div className="flex flex-col items-center justify-start w-full gap-5 section">
      {/* <div
        className={`flex items-center mb-6 ${
          fullAtmList.length ? "justify-between" : "justify-center"
        } w-full`}
      >
        {storedSearchPoint &&
        storedSearchPoint.lat === 0 &&
        storedSearchPoint.lng === 0
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
                onChange={toggleViewMode}
              />
            </label>
          </div>
        ) : null}
      </div> */}
      {fullAtmList.length > 0 && (
        <GoogleMaps
          center={storedSearchPoint}
          atms={filteredAtmList}
          selectAtm={setselectedAtmId}
          selectedAtmId={selectedAtmId}
        />
      )}

      <ul className="flex flex-col items-center justify-start w-full gap-4 overflow-y-scroll">
        {fullAtmList.length > 0 ? (
          filteredAtmList.map((atm: IAtmObject) => (
            <AtmListItem
              key={atm.place_id}
              atmData={atm}
              selectAtm={setselectedAtmId}
              selected={selectedAtmId === atm.place_id}
            />
          ))
        ) : (
          <div className="w-full text-center">No ATMs found</div>
        )}
      </ul>
    </div>
  );
};

export default AtmList;
