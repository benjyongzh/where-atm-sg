import { NextRequest, NextResponse } from "next/server";
import bankEndpoints, {
  rawAtmInfo,
  baseBankAtmListUrl,
  divClassName,
} from "@/lib/webscraping-data";
import { JSDOM } from "jsdom";

export async function GET(req: NextRequest) {
  try {
    //webscraping is done here
    // const result: AtmData = { message: "john doe" };
    const dbsAtms = await fetch(
      baseBankAtmListUrl + bankEndpoints.dbs.atmList
    ).then((data) => data.text());

    const dom = new JSDOM(dbsAtms);
    const document = dom.window.document;
    const atmDocList = document.querySelector(`.${divClassName}`)?.children;
    if (atmDocList === undefined)
      return new Response(
        JSON.stringify({ message: "Missing data extracted" })
      );

    let atmDocArray: rawAtmInfo[] = [];
    for (let i = 0; i < atmDocList!.length; i++) {
      const text = atmDocList![i].textContent;
      if (text !== "") {
        const textSplit = text!.split("\n");
        const atmInfo: rawAtmInfo = {
          name: textSplit[0],
          address: textSplit[1],
          postalCode: textSplit[2],
        };
        atmDocArray.push(atmInfo); //second console output
      }
    }
    console.log(atmDocArray);

    return new Response(JSON.stringify({ atmList: atmDocArray }));
  } catch (err) {
    return new Response(JSON.stringify({ message: "failed to load ATM data" }));
  }
}
