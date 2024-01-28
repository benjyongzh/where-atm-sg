import bankEndpoints, {
  rawAtmInfo,
  baseBankAtmListUrl,
  divClassName,
  isRawAtmInfo,
} from "@/lib/webscraping-data";
import { JSDOM } from "jsdom";
import { errorMessageQueue, isErrorMessageObject } from "./errors";

import { bankNameList } from "./atmObject";

export async function getAllAtmData() {
  //webscraping done here
  let atmList: rawAtmInfo[] = [];
  let errors: errorMessageQueue[] = [];

  for (let i = 0; i < bankNameList.length; i++) {
    let Atms: rawAtmInfo[] | errorMessageQueue = await getBankAtmList(
      bankNameList[i]
    );
    if (Array.isArray(Atms)) {
      atmList = atmList.concat(Atms);
    } else if (isErrorMessageObject(Atms)) {
      errors.push(Atms);
    }
  }

  console.log("total number of ATMs: ", atmList.length);
  console.log("total number of fetching errors: ", errors.length);
  return {
    atmList,
    errors,
  };
}

//sanitizing
const sanitizeAtmData = (atmDataText: string | null) => {
  if (typeof atmDataText === null) return {};

  // console.log("info: ", atmDataText);
  const splitText = atmDataText!.split("\n");
  const location = splitText[0];
  if (!isValidLocation(location)) return {};

  let addressLines: string[] = [];
  let infoLines: string[] = [];

  let endOfAddress = false;
  for (let i = 1; i < splitText.length; i++) {
    if (!endOfAddress) {
      addressLines.push(splitText[i]);
      //check if end of real address using regex and postalcode
      if (containsValidPostalCode(splitText[i])) {
        endOfAddress = true;
      }
    } else {
      infoLines.push(splitText[i]);
    }
  }
  const fullAddress = addressLines.join(", ");

  if (!isValidAddress(fullAddress)) return {};
  // console.log("ATM: ", location, fullAddress, infoLines);
  return { location, address: fullAddress, info: infoLines };
};

const isValidLocation = (locationText: string) => {
  //how to check if location is valid?
  return locationText !== "";
};

const isValidAddress = (addressText: string) => {
  //check if address is valid. how?
  return addressText !== "";
};

const containsValidPostalCode = (postalCode: string) => {
  //use regex to check
  let pattern = /(Singapore\s[0-9]{5,6}$)|^Singapore$/g;
  // if (!pattern.test(postalCode)) console.log(postalCode);
  return pattern.test(postalCode);
};

export const getBankAtmList = async (bankName: string) => {
  try {
    const endpoint: string = bankName.toLowerCase();
    const dbsAtms = await fetch(
      baseBankAtmListUrl +
        bankEndpoints[endpoint as keyof typeof bankEndpoints].atmList, //caching option here
      {
        cache: "no-store",
      }
    ).then((data) => data.text());

    const dom = new JSDOM(dbsAtms);
    const document = dom.window.document;
    const atmDocList = document.querySelector(`.${divClassName}`)?.children;

    let atmDocArray: rawAtmInfo[] = [];
    if (atmDocList === undefined)
      return { errorMessage: `Data of ${bankName} is empty` };

    for (let i = 0; i < atmDocList!.length; i++) {
      const text = atmDocList![i].textContent;
      const atmData = sanitizeAtmData(text);
      if (atmData) {
        const atmInfo: rawAtmInfo = {
          location: atmData.location!,
          brand: bankName,
          address: atmData.address!,
          info: atmData.info,
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
