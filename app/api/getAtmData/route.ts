import { NextApiRequest, NextApiResponse } from "next";

export type AtmData = {
  message: string;
};

export async function GET(req: Request) {
  try {
    const result: AtmData = { message: "john doe" };
    return new Response(JSON.stringify(result));
  } catch (err) {
    return new Response(JSON.stringify({ message: "failed to load ATM data" }));
  }
}
