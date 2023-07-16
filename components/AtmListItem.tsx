import { IAtmObject } from "@/lib/atmObject";
import React from "react";

const AtmListItem = (props: { atmData: IAtmObject }) => {
  const { atmData: atm } = props;
  return (
    <div className="flex flex-col justify-center w-full item-start">
      <div>{atm.brand}</div>
      <div>{atm.name}</div>
      <div>{atm.address}</div>
    </div>
  );
};

export default AtmListItem;
