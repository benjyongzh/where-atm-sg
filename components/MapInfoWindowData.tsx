import { GiPathDistance } from "react-icons/gi";

type InfoWindowProps = {
  title: string;
  address: string;
  distance: number;
  info?: string[];
};

const MapInfoWindowData = (props: InfoWindowProps) => {
  const { title, address, distance, info } = props;
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-bold">{title}</p>
      <p>{address}</p>
      <div className="flex items-center justify-start gap-3">
        <GiPathDistance />
        {distance}m
      </div>
    </div>
  );
};

export default MapInfoWindowData;
