"use client";

import { ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "./Map";

const apiKey = process.env.GMAPS_API_KEY;

export default function GoogleMaps() {
  if (!apiKey) {
    return (
      <div className="flex items-center justify-center w-full h-full gap-3">
        <span>No API key</span>
      </div>
    );
  }

  const render = (status: Status): ReactElement => {
    if (status === Status.LOADING)
      return (
        <div className="flex items-center justify-center w-full h-full gap-3">
          <span>Loading map</span>
          <span className="loading loading-dots loading-md"></span>
        </div>
      );
    if (status === Status.FAILURE)
      return (
        <div className="flex items-center justify-center w-full h-full gap-3">
          <span>Loading Failed</span>
        </div>
      );
    return <></>;
  };

  return (
    <Wrapper
      apiKey={apiKey}
      version="beta"
      render={render}
      libraries={["marker", "drawing"]}
    >
      <Map />
    </Wrapper>
  );
}
