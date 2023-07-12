import { NextRequest, NextResponse } from "next/server";
import { rawAtmInfo, isRawAtmInfo } from "@/lib/webscraping-data";
import { getBankAtmList } from "@/lib/load-atm-data";

import { isArrayOfInterface } from "@/utils/objects";

import { errorMessageObject, isErrorMessageObject } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    let atmList: rawAtmInfo[] = [];

    let dbsAtms: rawAtmInfo[] | errorMessageObject = await getBankAtmList(
      "DBS"
    );
    if (Array.isArray(dbsAtms)) atmList = atmList.concat(dbsAtms);

    let uobAtms: rawAtmInfo[] | errorMessageObject = await getBankAtmList(
      "UOB"
    );
    if (Array.isArray(uobAtms)) atmList = atmList.concat(uobAtms);

    let citibankAtms: rawAtmInfo[] | errorMessageObject = await getBankAtmList(
      "CitiBank"
    );

    if (Array.isArray(citibankAtms)) atmList = atmList.concat(citibankAtms);

    let maybankAtms: rawAtmInfo[] | errorMessageObject = await getBankAtmList(
      "MayBank"
    );
    if (Array.isArray(maybankAtms)) atmList = atmList.concat(maybankAtms);

    let standardcharteredAtms: rawAtmInfo[] | errorMessageObject =
      await getBankAtmList("StandardChartered");
    if (Array.isArray(standardcharteredAtms))
      atmList = atmList.concat(standardcharteredAtms);

    let ocbcAtms: rawAtmInfo[] | errorMessageObject = await getBankAtmList(
      "OCBC"
    );
    if (Array.isArray(ocbcAtms)) atmList = atmList.concat(ocbcAtms);

    let hsbcAtms: rawAtmInfo[] | errorMessageObject = await getBankAtmList(
      "HSBC"
    );
    if (Array.isArray(hsbcAtms)) atmList = atmList.concat(hsbcAtms);

    let anzAtms: rawAtmInfo[] | errorMessageObject = await getBankAtmList(
      "ANZ"
    );
    if (Array.isArray(anzAtms)) atmList = atmList.concat(anzAtms);

    let cimbAtms: rawAtmInfo[] | errorMessageObject = await getBankAtmList(
      "CIMB"
    );
    if (Array.isArray(cimbAtms)) atmList = atmList.concat(cimbAtms);

    let rhbAtms: rawAtmInfo[] | errorMessageObject = await getBankAtmList(
      "RHB"
    );
    if (Array.isArray(rhbAtms)) atmList = atmList.concat(rhbAtms);

    console.log("total number of ATMs: ", atmList.length);

    return new Response(
      JSON.stringify({
        atmList,
      })
    );
  } catch (err) {
    return new Response(JSON.stringify({ message: "failed to load ATM data" }));
  }
}
