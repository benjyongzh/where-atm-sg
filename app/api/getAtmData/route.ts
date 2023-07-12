import { NextRequest, NextResponse } from "next/server";
import { rawAtmInfo, isRawAtmInfo } from "@/lib/webscraping-data";
import { bankNameList, getBankAtmList } from "@/lib/load-atm-data";

import { errorMessageObject, isErrorMessageObject } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    let atmList: rawAtmInfo[] = [];
    let errors: errorMessageObject[] = [];

    for (let i = 0; i < bankNameList.length; i++) {
      let Atms: rawAtmInfo[] | errorMessageObject = await getBankAtmList(
        bankNameList[i]
      );
      if (Array.isArray(Atms)) {
        atmList = atmList.concat(Atms);
      } else if (isErrorMessageObject(Atms)) {
        errors.push(Atms);
      }
    }

    console.log("total number of ATMs: ", atmList.length);

    return new Response(
      JSON.stringify({
        atmList,
        errors,
      })
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "failed to load any ATM data" })
    );
  }
}
