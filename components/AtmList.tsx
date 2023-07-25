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
  const [selectedAtmId, setselectedAtmId] = useState<string | null>(null);
  const storedRange = useAppSelector((state) => state.settings.maxRange);
  const storedSearchPoint: IGeoCode = useAppSelector(
    (state) => state.settings.searchLocationPoint
  );

  const fullAtmList: IAtmObject[] = useAppSelector(
    (state) => state.atmData.allAtms
  );
  const storedBankFilter = useAppSelector(
    (state) => state.settings.bankFilterOut
  );

  /* const convertedAtmList = fullAtmList.map(
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
    .sort((atmA, atmB) => atmA.distance! - atmB.distance!) //sort from shortest distance to longest
    .filter((atm) => atm.distance <= storedRange); //only use ATMs in range */

  return (
    <div className="flex flex-col items-center justify-start w-full h-full max-w-5xl gap-5 mx-auto sm:px-10">
      {/* <div className="flex items-center justify-center w-full">
        {fullAtmList.length > 0 ? (
          <GoogleMaps
            center={storedSearchPoint}
            atms={filteredAtmList}
            selectAtm={setselectedAtmId}
            selectedAtmId={selectedAtmId}
          />
        ) : (
          <div className="w-full text-center">No ATMs found</div>
        )}
      </div> */}

      <ul className="flex flex-col items-center justify-start w-full gap-3 px-4 overflow-y-auto sm:gap-4 sm:px-0">
        {fullAtmList.length > 0
          ? fullAtmList.map((atm: IAtmObject) => (
              <AtmListItem key={atm.place_id} atmData={atm} />
            ))
          : null}
      </ul>
    </div>
  );
};

export default AtmList;
