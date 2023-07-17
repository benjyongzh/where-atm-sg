import { IGeoCode } from "@/features/googleAPI/geocoder";

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

export interface IAtmObject {
  brand: string;
  name: string;
  location: IGeoCode;
  place_id: string;
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
