import { IDirections } from "@/features/googleAPI/directions";
import { IGeoCode } from "@/features/googleAPI/geocoder";
import { haversine_distance } from "@/utils/distance";
import { errorMessageQueue } from "./errors";

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
  directions?: IDirections;
}

export interface searchResults {
  searchPointLatLong: IGeoCode;
  searchRange: number;
  desiredAtms: IAtmObject[];
  errorMessages: errorMessageQueue;
}

export interface rawFetchedNearbyPlacesInfo {
  location: IGeoCode;
  name: string;
  place_id: string;
  address: string;
}

export interface atmLoadingDirectionsFlag {
  atm: IAtmObject;
  isLoadingDirections: boolean;
}

export const getBrandFromRawPlacesInfo = (arg: rawFetchedNearbyPlacesInfo) => {
  //use includes between bankNameList and arg.name
  for (let i = 0; i < bankNameList.length; i++) {
    if (arg.name.toLowerCase().includes(bankNameList[i].toLowerCase())) {
      return bankNameList[i];
    }
  }
  return "";
};

const getRelevantRawAtmData = (
  allAtms: Array<any>
): rawFetchedNearbyPlacesInfo[] => {
  const processedAtmData: rawFetchedNearbyPlacesInfo[] = allAtms.map(
    (atmInfo: any) => {
      return {
        location: {
          lat: atmInfo.geometry.location.lat,
          lng: atmInfo.geometry.location.lng,
        },
        name: atmInfo.name,
        place_id: atmInfo.place_id,
        address: atmInfo.vicinity,
      };
    }
  );

  // console.log("processedAtmData: ", processedAtmData);
  return processedAtmData;
};

const convertRawAtmsToAtmObjects = (
  rawList: rawFetchedNearbyPlacesInfo[],
  searchPoint: IGeoCode
): IAtmObject[] => {
  return rawList.map((atm: rawFetchedNearbyPlacesInfo): IAtmObject => {
    const atmBrand = getBrandFromRawPlacesInfo(atm);

    // log distances from each ATM
    const distance = haversine_distance(searchPoint, atm.location);
    return {
      brand: atmBrand,
      name: atm.name,
      location: atm.location,
      place_id: atm.place_id,
      address: atm.address,
      distance,
    };
  });
};

const filterAtmBrands = (
  atmList: IAtmObject[],
  brandList: string[]
): IAtmObject[] => {
  return atmList.filter((atm: IAtmObject): boolean => {
    return !brandList.includes(atm.brand) && atm.brand !== "";
  });
};

export const filterDistance = (
  atmList: IAtmObject[],
  searchRange: number
): IAtmObject[] => {
  return atmList
    .sort((atmA, atmB) => atmA.distance! - atmB.distance!) //sort from shortest distance to longest
    .filter((atm) => atm.distance <= searchRange); //only use ATMs in range
};

export const processAtmDataForRedux = (params: {
  fullAtmList: Array<any>;
  searchPoint: IGeoCode;
  searchRange: number;
  bankFilterList: string[];
}): IAtmObject[] => {
  const { fullAtmList, searchPoint, searchRange, bankFilterList } = params;

  const rawAtmData = getRelevantRawAtmData(fullAtmList);

  const convertedAtmData: IAtmObject[] = convertRawAtmsToAtmObjects(
    rawAtmData,
    searchPoint
  );

  const filteredBanksAtmData = filterAtmBrands(
    convertedAtmData,
    bankFilterList
  );
  const filteredDistanceAtmData = filterDistance(
    filteredBanksAtmData,
    searchRange
  );

  // console.log("processedAtmData: ", processedAtmData);
  return filteredDistanceAtmData;
};

export const groupAccordingToKey = <T>(
  arr: Array<T>,
  key: keyof T,
  filters?: { [key: string]: string[] }[]
): Array<Array<T>> => {
  let filterGroups: Array<Array<string>> = [];

  let groupingObj: { [key: string]: Array<T> } = {};

  if (filters) {
    filterGroups = filters.map((filter): Array<string> => {
      return Object.values(filter)[0];
    });
    // console.log(filterGroups);
    /* [[ 'DBS', 'POSB' ],
    [ 'UOB' ],
    [ 'CitiBank' ],
    [ 'MayBank' ],
    [ 'Standard Chartered' ],
    [ 'OCBC' ],
    [ 'HSBC' ],
    [ 'ANZ', 'CIMB', 'RHB' ]] */

    const filterGroupNames: Array<string> = filterGroups.map((group) =>
      group.join("/")
    );
    // console.log("filterGroupNames", filterGroupNames);

    for (let i = 0; i < filterGroupNames.length; i++) {
      // console.log(filterGroupNames[i]);
      groupingObj[filterGroupNames[i]] = [];
    }

    // console.log(groupingObj);
  }

  for (let i = 0; i < arr.length; i++) {
    const groupingVal: any = arr[i][key]; // actual bank brand

    if (filters) {
      const itemGroup: Array<string> = filterGroups.filter((group) =>
        group.includes(groupingVal)
      )[0];

      if (itemGroup) {
        //item is available in at least 1 filter group
        const itemGroupName = itemGroup.join("/");
        groupingObj[itemGroupName].push(arr[i]);
      } else {
        //item does not exist in any filter group
      }
    } else {
      const existingKeys: Array<any> = Object.keys(groupingObj);
      if (existingKeys.includes(groupingVal)) {
        //this group already exists
        groupingObj[groupingVal as keyof typeof groupingObj].push(arr[i]);
      } else {
        //this is a new group. create one
        groupingObj[groupingVal as keyof typeof groupingObj] = [arr[i]];
      }
    }
  }
  console.log(groupingObj);

  let finalArr: Array<Array<T>> = [];
  for (let keys in groupingObj) {
    // console.log(keys);
    // console.log(groupingObj[keys]);
    finalArr = finalArr.concat(groupingObj[keys]);
  }

  return finalArr;
};
