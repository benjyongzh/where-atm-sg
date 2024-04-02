"use client";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

type MarkerProps = {
  data: Object;
  map: google.maps.Map | null;
  position: { lat: number; lng: number };
  children: React.ReactNode;
  onClick: Function;
};

const MapMarker = (props: MarkerProps) => {
  const { data, map, position, children, onClick } = props;

  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );
  const rootRef = useRef<any>(null);

  useEffect(() => {
    if (!rootRef.current) {
      const markerContainer = document.createElement("div");
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

    const clickListener = markerRef.current!.addListener("click", onClick);

    return () => {
      clickListener.remove();
    };
  }, [data, map, children, onClick]);
};

export default MapMarker;
