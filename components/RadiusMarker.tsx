import { IGeoCode } from "@/features/googleAPI/geocoder";
import CustomCircle from "@/lib/customCircle";

type RadiusMarkerProps = {
  center: IGeoCode;
  radius: number;
  map: google.maps.Map | null;
};

const RadiusMarker = (props: RadiusMarkerProps) => {
  const { center, radius, map } = props;

  let circle = CustomCircle(center, radius, map!);

  return (
    <div
      className={`cursor-pointer aspect-square w-[${radius}] object-center rounded-full border-4 bg-base-content bg-opacity-10 border-opacity-80`}
    ></div>
  );
};

export default RadiusMarker;
