import { IGeoCode } from "@/features/googleAPI/geocoder";
import { haversine_distance } from "@/utils/distance";

export const bankNameList: string[] = [
  "DBS",
  "POSB",
  "UOB",
  "CitiBank",
  "MayBank",
  "Standard Chartered",
  "OCBC",
  "HSBC",
  "ANZ",
  "CIMB",
  "RHB",
];

export type bankFilter = {
  banks: string[];
};

export const bankFilters: bankFilter[] = [
  {
    banks: ["DBS", "POSB"],
  },
  {
    banks: ["UOB"],
  },
  {
    banks: ["CitiBank"],
  },
  {
    banks: ["MayBank"],
  },
  {
    banks: ["Standard Chartered"],
  },
  {
    banks: ["OCBC"],
  },
  {
    banks: ["HSBC"],
  },
  {
    banks: ["ANZ", "CIMB", "RHB"],
  },
];

export interface IAtmObject {
  brand: string;
  name: string;
  location: IGeoCode;
  place_id: string;
  address: string;
  info?: string[];
  distance: number;
}

export interface rawFetchedNearbyPlacesInfo {
  location: IGeoCode;
  name: string;
  place_id: string;
  vicinity: string;
}

export const getBrandFromRawPlacesInfo = (arg: rawFetchedNearbyPlacesInfo) => {
  //use includes between bankNameList and arg.name
  for (let i = 0; i < bankNameList.length; i++) {
    if (arg.name.toLowerCase().includes(bankNameList[i].toLowerCase())) {
      return bankNameList[i];
    }
  }
  /* bankNameList.forEach((bankName) => {
    console.log(`checking for bank: `, bankName.toLowerCase());
    console.log(`atm name: `, arg.name.toLowerCase());
    console.log(
      `match: `,
      arg.name.toLowerCase().includes(bankName.toLowerCase())
    );

    
  }); */
  return "";
};

export const storeSearchedAtms = (allAtms: Array<any>) => {
  const processedAtmData: rawFetchedNearbyPlacesInfo[] = allAtms.map(
    (atmInfo: any) => {
      return {
        location: {
          lat: atmInfo.geometry.location.lat,
          lng: atmInfo.geometry.location.lng,
        },
        name: atmInfo.name,
        place_id: atmInfo.place_id,
        vicinity: atmInfo.vicinity,
      };
    }
  );

  // console.log("processedAtmData: ", processedAtmData);
  return processedAtmData;
};

export const convertRawAtmsToAtmObjects = (
  rawList: rawFetchedNearbyPlacesInfo[],
  searchPoint: IGeoCode
) => {
  return rawList.map((atm: rawFetchedNearbyPlacesInfo): IAtmObject => {
    const atmBrand = getBrandFromRawPlacesInfo(atm);

    // log distances from each ATM
    const distance = haversine_distance(searchPoint, atm.location);
    return {
      brand: atmBrand,
      name: atm.name,
      location: atm.location,
      place_id: atm.place_id,
      address: atm.vicinity,
      distance,
    };
  });
};

export const filterAtmBrands = (atmList: IAtmObject[], brandList: string[]) => {
  return atmList.filter((atm: IAtmObject): boolean => {
    return !brandList.includes(atm.brand) && atm.brand !== "";
  });
};

export const filterDistance = (atmList: IAtmObject[], searchRange: number) => {
  return atmList
    .sort((atmA, atmB) => atmA.distance! - atmB.distance!) //sort from shortest distance to longest
    .filter((atm) => atm.distance <= searchRange); //only use ATMs in range
};
