"use client";

//components
import { IAtmObject } from "@/lib/atmObject";

type AtmMarkerProps = {
  atm: IAtmObject;
  // onClick: Function;
  // onHover: Function;
  storedSelectedAtmId: string | null;
  storedHoveredAtmId: string | null;
  storedBankFilters: string[];
};

const AtmMarker = (props: AtmMarkerProps) => {
  const {
    atm,
    // onClick,
    // onHover,
    storedSelectedAtmId,
    storedHoveredAtmId,
    storedBankFilters,
  } = props;

  return (
    <div
      className={`cursor-pointer aspect-square w-6 object-center rounded-full border-4 bg-opacity-90
      ${
        storedHoveredAtmId === atm.place_id
          ? "bg-secondary"
          : storedBankFilters.includes(atm.brand)
          ? "bg-neutral-content"
          : "bg-primary"
      } ${
        storedHoveredAtmId === atm.place_id ||
        storedSelectedAtmId === atm.place_id
          ? "scale-150"
          : "scale-100"
      } ${
        storedSelectedAtmId === atm.place_id
          ? "border-primary-content"
          : "border-white"
      } ${storedHoveredAtmId === atm.place_id ? "z-50" : ""}`}
      // onMouseOver={() => onHover(true, atm.brand, atm.place_id)}
      // onMouseOut={() => onHover(false, atm.brand, atm.place_id)}
      // onClick={() => onClick(atm.place_id, atm.brand)}
    ></div>
  );
};

export default AtmMarker;
