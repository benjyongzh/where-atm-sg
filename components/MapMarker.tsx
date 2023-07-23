"use client";

import { useState, useEffect } from "react";

//redux
import { useAppSelector } from "@/hooks/reduxHooks";

import { MarkerF, InfoWindow } from "@react-google-maps/api";
import { IAtmObject } from "@/lib/atmObject";
import MapInfoWindowData from "./MapInfoWindowData";
import daisyuiColors from "daisyui/src/theming/themes";
const cupcakeColours = daisyuiColors["[data-theme=cupcake]"];
const lightColours = daisyuiColors["[data-theme=light]"];
const nightColours = daisyuiColors["[data-theme=night]"];

type MarkerProps = {
  atm: IAtmObject;
  handleSelect: Function;
};

const MapMarker = (props: MarkerProps) => {
  const { atm, handleSelect } = props;
  const [inRange, setInRange] = useState(false);
  const storedRange = useAppSelector((state) => state.settings.maxRange);
  const storedSelectedAtmId = useAppSelector(
    (state) => state.atmData.selectedAtmPlaceId
  );

  const svgMarkerInRange = {
    path: "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z",
    fillColor: cupcakeColours.primary,
    fillOpacity: 0.9,
    strokeWeight: 2,
    strokeColor: nightColours.info,
    scale: 2,
    anchor: new google.maps.Point(12, 21),
  };

  const svgMarkerOutOfRange = {
    path: "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z",
    fillColor: cupcakeColours.secondary,
    fillOpacity: 0.9,
    strokeWeight: 2,
    strokeColor: nightColours.error,
    scale: 2,
    anchor: new google.maps.Point(12, 21),
  };

  useEffect(() => {
    setInRange(atm.distance <= storedRange);
    // console.log(`${atm.brand} is in range? `, inRange);
  }, [storedRange]);

  return (
    <MarkerF
      position={atm.location} //marker position
      onClick={() => handleSelect(atm)}
      // icon={inRange ? svgMarkerInRange : svgMarkerOutOfRange}
      icon={svgMarkerInRange}
      key={atm.place_id}
    >
      {storedSelectedAtmId === atm.place_id && (
        <InfoWindow
          onCloseClick={() => handleSelect(null)}
          position={atm.location} //marker position
        >
          <MapInfoWindowData
            title={atm.brand}
            address={atm.address}
            distance={atm.distance}
            info={atm.info}
          />
        </InfoWindow>
      )}
    </MarkerF>
  );
};

export default MapMarker;
