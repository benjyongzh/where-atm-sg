"use client";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

type MarkerProps = {
  data: Object;
  map: google.maps.Map | null;
  position: { lat: number; lng: number };
  children: React.ReactNode;
  onMouseOver: Function;
  onMouseOut: Function;
  onClick: Function;
};

const MapMarker = (props: MarkerProps) => {
  const { data, map, position, children, onMouseOver, onMouseOut, onClick } =
    props;

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

    const mouseOverListener = markerRef.current!.addListener(
      "mouseover",
      onMouseOver
    );
    const mouseOutListener = markerRef.current!.addListener(
      "mouseout",
      onMouseOut
    );
    const clickListener = markerRef.current!.addListener("click", onClick);

    return () => {
      mouseOverListener.remove();
      mouseOutListener.remove();
      clickListener.remove();
    };
  }, [data, map, children, onClick, onMouseOut, onMouseOver]);
};

export default MapMarker;
