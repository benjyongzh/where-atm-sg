"use client";

import { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

//redux
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import {
  setOnHoverAtmPlaceId,
  setSelectedAtmPlaceId,
} from "@/features/atmData/atmDataSlice";

//components
import { IAtmObject } from "@/lib/atmObject";

//graphics
import daisyuiColors from "daisyui/src/theming/themes";
const cupcakeColours = daisyuiColors["[data-theme=cupcake]"];
const lightColours = daisyuiColors["[data-theme=light]"];
const nightColours = daisyuiColors["[data-theme=night]"];

type MarkerProps = {
  data: Object;
  map: google.maps.Map | null;
  position: { lat: number; lng: number };
  children: React.ReactNode;
};

const MapMarker = (props: MarkerProps) => {
  const { data, map, position, children } = props;

  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );
  const rootRef = useRef<any>(null);

  /* const dispatch = useAppDispatch();
  const storedSelectedAtmId = useAppSelector(
    (state) => state.atmData.selectedAtmPlaceId
  );

  const storedHoveredAtmId = useAppSelector(
    (state) => state.atmData.onHoverAtmPlaceId
  );

  const storedBankFilters = useAppSelector(
    (state) => state.settings.bankFilterOut
  ); */

  // const handleOnLoad = (markerInstance: google.maps.Marker) => {
  //   markerRef.current = markerInstance;
  // };

  /* const handleMouseOver = (over: boolean) => {
    if (storedBankFilters.includes(atm.brand)) return;
    dispatch(setOnHoverAtmPlaceId(over ? atm.place_id : null));
  };

  const handleClick = (id: string | null) => {
    if (storedBankFilters.includes(atm.brand)) return;
    dispatch(setSelectedAtmPlaceId(id));
  }; */

  /* const getCircleMarker = (): google.maps.Symbol => {
    return {
      path: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
      fillColor: getMarkerColour(),
      fillOpacity: 0.9,
      strokeWeight: 5,
      strokeColor: getStrokeColor(),
      scale: getMarkerScale(),
      anchor: getMarkerAnchor(),
    };
  };

  const getStrokeColor = () => {
    return storedSelectedAtmId === atm.place_id ? "hsl(var(--pc))" : "white";
  };

  const getMarkerColour = () => {
    if (storedHoveredAtmId === atm.place_id) {
      return cupcakeColours.secondary;
    } else if (storedBankFilters.includes(atm.brand)) {
      return lightColours["neutral-content"];
    } else return cupcakeColours.primary;
  };

  const getMarkerScale = () => {
    return storedHoveredAtmId === atm.place_id ||
      storedSelectedAtmId === atm.place_id
      ? 2
      : 1.5;
  };

  const getMarkerAnchor = () => {
    return storedHoveredAtmId === atm.place_id ||
      storedSelectedAtmId === atm.place_id
      ? new google.maps.Point(12, 19.5)
      : new google.maps.Point(12, 21);
  };

  const getZIndex = () => {
    return storedHoveredAtmId === atm.place_id ? 99 : 11;
  }; */

  /* useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setIcon(getCircleMarker());
      markerRef.current.setZIndex(getZIndex());
    }
  }, [storedHoveredAtmId, storedBankFilters]); */

  useEffect(() => {
    if (!rootRef.current) {
      // rootRef.current = createPortal(<div></div>, document.body);
      const container = document.createElement("div");
      rootRef.current = createRoot(container);

      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        // map,
        content: container,
        position,
      });

      // AdvancedMarkerElement.addListener("click", () => {
      //   toggleHighlight(AdvancedMarkerElement, property);
      // });

      // markerRef.current = new google.maps.marker.AdvancedMarkerView({
      //   position,
      //   content: container,
      // });
    }
    return () => {
      if (markerRef.current) markerRef.current.map = null;
    };
  }, []);

  useEffect(() => {
    rootRef.current.render(children);
    if (markerRef.current) {
      markerRef.current.position = position;
      markerRef.current.map = map;
    }

    // const listener = markerRef.current!.addListener("click", onClick);
    // return () => listener.remove();
  }, [data, map, children]);
};

export default MapMarker;
