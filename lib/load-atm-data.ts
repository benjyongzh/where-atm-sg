import bankEndpoints, {
  rawAtmInfo,
  baseBankAtmListUrl,
  divClassName,
} from "@/lib/webscraping-data";
import { JSDOM } from "jsdom";
import { errorMessageObject } from "./errors";

export async function getAllAtmData() {
  //webscraping done here
  const atmData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}getAtmData`, {
    cache: "no-store",
  }); //for production, set to caching
  const data = await atmData.json();
  return data;
}

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
      if (text !== "") {
        const textSplit = text!.split("\n");
        const atmInfo: rawAtmInfo = {
          name: textSplit[0],
          brand: bankName,
          address: textSplit[1],
          postalCode: textSplit[2],
        };
        atmDocArray.push(atmInfo); //second console output
      }
    }

    return atmDocArray;
  } catch (err) {
    return { errorMessage: `failed to load data of ${bankName}` };
  }
};
