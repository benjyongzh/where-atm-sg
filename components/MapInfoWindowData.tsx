import { IAtmObject } from "@/lib/atmObject";
import { GiPathDistance } from "react-icons/gi";

type InfoWindowProps = {
  atmData: IAtmObject;
};

const MapInfoWindowData = (props: InfoWindowProps) => {
  const { brand, name, address, distance, info } = props.atmData;
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-bold">{brand}</p>
      <p>{address}</p>
      <div className="flex items-center justify-start gap-3">
        <GiPathDistance />
        {distance}m
      </div>
    </div>
  );
};

export default MapInfoWindowData;
