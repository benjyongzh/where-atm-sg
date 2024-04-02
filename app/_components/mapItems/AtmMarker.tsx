//components
import { IAtmObject } from "@/app/_lib/atmObject";

type AtmMarkerProps = {
  atm: IAtmObject;
  storedSelectedAtmId: string | null;
  storedHoveredAtmId: string | null;
  storedBankFilters: string[];
  onMouseOver: Function;
  onMouseOut: Function;
};

const AtmMarker = (props: AtmMarkerProps) => {
  const {
    atm,
    storedSelectedAtmId,
    storedHoveredAtmId,
    storedBankFilters,
    onMouseOver,
    onMouseOut,
  } = props;

  return (
    <div
      onMouseOver={() => onMouseOver(true, atm.brand, atm.place_id)}
      onMouseOut={() => onMouseOut(false, atm.brand, atm.place_id)}
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
    ></div>
  );
};

export default AtmMarker;
