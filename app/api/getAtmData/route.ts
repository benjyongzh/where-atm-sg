import { NextRequest, NextResponse } from "next/server";

export type AtmData = {
  message: string;
};

export async function GET(req: NextRequest) {
  try {
    //webscraping is done here
    const result: AtmData = { message: "john doe" };

    return new Response(JSON.stringify(result));
  } catch (err) {
    return new Response(JSON.stringify({ message: "failed to load ATM data" }));
  }
}
