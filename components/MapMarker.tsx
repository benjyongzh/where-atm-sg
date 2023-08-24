"use client";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

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

  useEffect(() => {
    if (!rootRef.current) {
      // const mainMapContainer = document.getElementById("mainMap");
      const markerContainer = document.createElement("div");
      // mainMapContainer!.appendChild(markerContainer);
      rootRef.current = createRoot(markerContainer);

      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        // map,
        content: markerContainer,
        position,
      });
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
