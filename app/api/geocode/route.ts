import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const addressInput = await req.json();
    const result = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${addressInput}&key=${process.env.GMAPS_API_KEY}`
    );
    const latlong = await result.json();

    return new NextResponse(JSON.stringify(latlong));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "failed to fetch any data" })
    );
  }
}
