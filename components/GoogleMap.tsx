import { useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import { IGeoCode } from "@/features/googleAPI/geocoder";
import { IAtmObject } from "@/lib/atmObject";

import { useAppSelector } from "@/hooks/reduxHooks";

type GoogleMapsProps = {
  atms: IAtmObject[];
};

export default function GoogleMaps(props: GoogleMapsProps) {
  const googleMapsApiKey = process.env.GMAPS_API_KEY;
  if (googleMapsApiKey === undefined) {
    return <div>Error</div>;
  }
  return <Map googleMapsApiKey={googleMapsApiKey} atms={props.atms} />;
}

type MapProps = {
  googleMapsApiKey: string;
  atms: IAtmObject[];
};

function Map({ googleMapsApiKey }: MapProps) {
  // infers type from default value
  const center: IGeoCode = useAppSelector(
    (state) => state.settings.searchLocationPoint
  );
  const [selectedMarker, setSelectedMarker] = useState<IGeoCode | null>(center);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <div className="mx-20 my-8 md:my-10">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="googlemap-container"
        >
          {/* center marking */}
          <MarkerF
            position={center} //marker position
            onClick={() => {
              setSelectedMarker(center); //marker position
            }}
          >
            {selectedMarker && (
              <InfoWindow
                onCloseClick={() => {
                  setSelectedMarker(null);
                }}
                position={center} //marker position
              >
                <p>Directions</p>
                <p>This is your input address</p>
              </InfoWindow>
            )}
          </MarkerF>

          {/* set atm locations across map */}
        </GoogleMap>
      </div>
    </>
  );
}
