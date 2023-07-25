"use client";

import React, { /* useRef,  */ useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  CircleF,
  InfoWindow,
} from "@react-google-maps/api";

//redux
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { setSelectedAtmPlaceId } from "@/features/atmData/atmDataSlice";
import {
  mapCenterDefault,
  //setMapCentrePoint,
} from "@/features/settings/settingsSlice";
import { getGMapsAPIKey } from "@/features/googleAPI/key";

//daisyUI
import MapInfoWindowData from "./MapInfoWindowData";
import daisyuiColors from "daisyui/src/theming/themes";
const cupcakeColours = daisyuiColors["[data-theme=cupcake]"];
const lightColours = daisyuiColors["[data-theme=light]"];
const nightColours = daisyuiColors["[data-theme=night]"];

//lib/utils
import { IGeoCode } from "@/features/googleAPI/geocoder";
import {
  IAtmObject,
  rawFetchedNearbyPlacesInfo,
  getBrandFromRawPlacesInfo,
} from "@/lib/atmObject";
import { haversine_distance } from "@/utils/distance";
import MapMarker from "./MapMarker";

function GoogleMaps() {
  //redux
  const dispatch = useAppDispatch();
  const storedRange = useAppSelector((state) => state.settings.maxRange);
  // const latestSearchRange = useRef(storedRange);
  const storedSelectedAtmId = useAppSelector(
    (state) => state.atmData.selectedAtmPlaceId
  );
  const fullAtmList: IAtmObject[] = useAppSelector(
    (state) => state.atmData.allAtms
  );
  const storedBankFilter = useAppSelector(
    (state) => state.settings.bankFilterOut
  );
  const storedSearchPoint: IGeoCode = useAppSelector(
    (state) => state.settings.searchLocationPoint
  );

  /* const storedMapCentrePoint: IGeoCode = useAppSelector(
    (state) => state.settings.mapCentrePoint
  ); */

  const searchStarted: boolean = useAppSelector(
    (state) => state.atmData.searchStarted
  );
  const currentBreakpoint: string = useAppSelector(
    (state) => state.display.currentBreakpoint
  );

  //states
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY!, //API key
  });
  // const { atms, center, selectAtm, selectedAtmId } = props;
  const [map, setMap] = useState<any>(null);

  const initialZoom = currentBreakpoint === "xs" ? 10 : 11;

  const onLoad = useCallback(function callback(map: any) {
    // const bounds = new window.google.maps.LatLngBounds(mapCenterDefault);
    // map.fitBounds(bounds);
    map.setZoom(initialZoom);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  /* const allAtmList = fullAtmList
    .map((atm: rawFetchedNearbyPlacesInfo): IAtmObject => {
      const atmBrand = getBrandFromRawPlacesInfo(atm);

      // log distances from each ATM
      const distance = haversine_distance(storedSearchPoint, atm.location);
      return {
        brand: atmBrand,
        name: atm.name,
        location: atm.location,
        place_id: atm.place_id,
        address: atm.vicinity,
        distance,
      };
    })
    .filter((atm: IAtmObject): boolean => {
      return !storedBankFilter.includes(atm.brand) && atm.brand !== "";
    })
    .sort((atmA, atmB) => atmA.distance! - atmB.distance!); //sort from shortest distance to longest */

  /* const filteredAtmList = fullAtmList
    .map((atm: rawFetchedNearbyPlacesInfo): IAtmObject => {
      const atmBrand = getBrandFromRawPlacesInfo(atm);

      // log distances from each ATM
      const distance = haversine_distance(storedSearchPoint, atm.location);
      return {
        brand: atmBrand,
        name: atm.name,
        location: atm.location,
        place_id: atm.place_id,
        address: atm.vicinity,
        distance,
      };
    })
    .filter((atm: IAtmObject): boolean => {
      return !storedBankFilter.includes(atm.brand) && atm.brand !== "";
    })
    .sort((atmA, atmB) => atmA.distance! - atmB.distance!) //sort from shortest distance to longest
    .filter((atm) => atm.distance <= storedRange); //only use ATMs in range */

  const handleSelectAtmMarker = (atm: IAtmObject | null) => {
    if (atm === null) {
      dispatch(setSelectedAtmPlaceId(null));
    } else {
      dispatch(setSelectedAtmPlaceId(atm.place_id));
      mapLookAt(atm.location);
    }
  };

  useEffect(() => {
    if (storedSelectedAtmId !== null) {
      const atmsInFocus = fullAtmList.filter(
        (atm) => atm.place_id === storedSelectedAtmId
      );
      if (atmsInFocus.length) mapLookAt(atmsInFocus[0].location);
      // dispatch(setMapCentrePoint(atmsInFocus[0].location));
    }
  }, [storedSelectedAtmId]);

  useEffect(() => {
    mapLookAt(storedSearchPoint);
    mapFitFilteredAtms();
    //create new static circle
    // latestSearchRange.current = storedRange;
    // staticCircle = (
    //   <CircleF
    //     options={{
    //       strokeColor: cupcakeColours.neutral,
    //       strokeOpacity: 0.8,
    //       strokeWeight: 2,
    //       fillColor: cupcakeColours.neutral,
    //       fillOpacity: 0,
    //       clickable: false,
    //       draggable: false,
    //       editable: false,
    //       visible: true,
    //       zIndex: 1,
    //     }}
    //     center={storedSearchPoint}
    //     radius={latestSearchRange.current}
    //   ></CircleF>
    // );
  }, [storedSearchPoint]);

  // let staticCircle = null;

  const mapLookAt = (point: IGeoCode) => {
    /* console.log(point);
    console.log(map); */
    if (map) map.panTo(point);
  };

  const mapFitFilteredAtms = () => {
    if (!isLoaded) return;
    if (fullAtmList.length < 1) {
      map.setZoom(initialZoom + 4);
      return;
    }
    const bounds = new google.maps.LatLngBounds();
    fullAtmList.forEach((atm) => bounds.extend(atm.location));
    map.fitBounds(bounds);
    // map.fitBounds(searchCircle.getBounds());
  };

  /*   const searchCircle = new google.maps.Circle({
    strokeColor: cupcakeColours.primary,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: cupcakeColours.primary,
    fillOpacity: 0.1,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1,
    map,
    center: storedSearchPoint,
    radius: storedRange,
  }); */

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%",
      }}
      center={mapCenterDefault}
      zoom={initialZoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        gestureHandling: "greedy",
        disableDefaultUI: true,
        streetViewControl: false,
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}

      {/* center marking */}
      {searchStarted === true ? (
        <CircleF
          options={{
            strokeColor: cupcakeColours.primary,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: cupcakeColours.primary,
            fillOpacity: 0.1,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            zIndex: 1,
          }}
          center={storedSearchPoint}
          radius={storedRange}
        ></CircleF>
      ) : null}

      {/* center marking static */}
      {/* {staticCircle} */}

      {/* ATMs found */}
      {fullAtmList.map(
        (atm) =>
          isLoaded && (
            <MapMarker
              atm={atm}
              key={atm.place_id}
              handleSelect={handleSelectAtmMarker}
            />
          )
        // {/* <MarkerF
        //   position={atm.location} //marker position
        //   onClick={() => handleSelectAtmMarker(atm)}
        //   icon={
        //     atm.distance <= storedRange ? svgMarkerInRange : svgMarkerOutOfRange
        //   }
        //   key={atm.place_id}
        // >
        //   {storedSelectedAtmId === atm.place_id && (
        //     <InfoWindow
        //       onCloseClick={() => handleSelectAtmMarker(null)}
        //       position={atm.location} //marker position
        //     >
        //       <MapInfoWindowData
        //         title={atm.brand}
        //         address={atm.address}
        //         distance={atm.distance}
        //         info={atm.info}
        //       />
        //     </InfoWindow>
        //   )}
        // </MarkerF> */}
      )}
    </GoogleMap>
  ) : (
    <div className="flex items-center justify-center w-full h-full gap-3">
      <span>Loading map</span>
      <span className="loading loading-dots loading-md"></span>
    </div>
  );
}

export default React.memo(GoogleMaps);
