import { rawAtmInfo } from "@/lib/webscraping-data";
import React from "react";

const AtmListItem = (props: { atmData: rawAtmInfo }) => {
  return (
    <div className="flex flex-col items-start justify-between gap-1 p-3">
      <div>{props.atmData.location}</div>
      <div>{props.atmData.brand}</div>
      <div>{props.atmData.address}</div>
      <div>
        {props.atmData.info?.map((infoline, i) => (
          <div key={i}>{infoline}</div>
        ))}
      </div>
    </div>
  );
};

export default AtmListItem;
