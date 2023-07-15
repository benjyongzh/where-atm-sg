import { IGeoCode } from "@/features/googleAPI/geocoder";

export const bankNameList: string[] = [
  "DBS",
  "UOB",
  "CitiBank",
  "MayBank",
  "StandardChartered",
  "OCBC",
  "HSBC",
  "ANZ",
  "CIMB",
  "RHB",
  "AXS",
];

export interface IAtmObject {
  brand: string;
  address: string;
  info?: string[];
  distance?: number;
}

export interface rawFetchedNearbyPlacesInfo {
  location: IGeoCode;
  name: string;
  place_id: string;
  vicinity: string;
}

export const getBrandFromRawPlacesInfo = (arg: rawFetchedNearbyPlacesInfo) => {
  //use includes between bankNameList and arg.name
  bankNameList.forEach((bankName) => {
    if (arg.name.toLowerCase().includes(bankName.toLowerCase())) {
      return bankName;
    }
  });
  return "";
};
