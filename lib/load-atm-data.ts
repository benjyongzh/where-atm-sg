import bankEndpoints, {
  rawAtmInfo,
  baseBankAtmListUrl,
  divClassName,
  isRawAtmInfo,
} from "@/lib/webscraping-data";
import { JSDOM } from "jsdom";
import { errorMessageObject } from "./errors";

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
];

export async function getAllAtmData() {
  //webscraping done here
  const atmData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}getAtmData`, {
    cache: "no-store",
  }); //for production, set to caching
  const data = await atmData.json();
  return data;
}

//sanitizing
const isValidAtmData = (atmData: {
  location: string;
  address: string;
  postalCode: string;
}) => {
  return (
    isValidLocation(atmData.location) &&
    isValidAddress(atmData.address) &&
    isValidPostalCode(atmData.postalCode)
  );
};

const isValidLocation = (postalCode: string) => {
  //use regex to check
  return true;
};

const isValidAddress = (postalCode: string) => {
  //use regex to check
  return true;
};

const isValidPostalCode = (postalCode: string) => {
  //use regex to check
  return true;
};

export const getBankAtmList = async (bankName: string) => {
  try {
    const endpoint: string = bankName.toLowerCase();
    const dbsAtms = await fetch(
      baseBankAtmListUrl +
        bankEndpoints[endpoint as keyof typeof bankEndpoints].atmList
    ).then((data) => data.text());

    const dom = new JSDOM(dbsAtms);
    const document = dom.window.document;
    const atmDocList = document.querySelector(`.${divClassName}`)?.children;

    let atmDocArray: rawAtmInfo[] = [];
    if (atmDocList === undefined)
      return { errorMessage: `Data of ${bankName} is empty` };

    for (let i = 0; i < atmDocList!.length; i++) {
      const text = atmDocList![i].textContent;
      const [location, address, postalCode] = text!.split("\n");
      if (isValidAtmData({ location, address, postalCode })) {
        const atmInfo: rawAtmInfo = {
          location,
          brand: bankName,
          address,
          postalCode,
        };
        //sanitize
        if (isRawAtmInfo(atmInfo)) atmDocArray.push(atmInfo);
      }
    }

    return atmDocArray;
  } catch (err) {
    return { errorMessage: `failed to load data of ${bankName}` };
  }
};
