import { NextRequest, NextResponse } from "next/server";
import { rawAtmInfo, isRawAtmInfo } from "@/lib/webscraping-data";
import { getBankAtmList } from "@/lib/load-atm-data";
import { bankNameList } from "@/lib/atmObject";

import {
  errorMessageQueue,
  isErrorMessageObject,
  setDisplayErrorMessage,
  errorMessageStrings,
} from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
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

    return new Response(
      JSON.stringify({
        atmList,
        errors,
      })
    );
  } catch (err) {
    setDisplayErrorMessage(errorMessageStrings.placesAPIFailure);
    return new Response(
      JSON.stringify({ message: "failed to load any ATM data" })
    );
  }
}
