"use client";

import { IGeoCode } from "@/features/googleAPI/geocoder";
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

type CircleDrawingProps = {
  map: google.maps.Map | null;
  position: IGeoCode;
  radius: number;
  onClick: Function;
};

const MapCircleDrawing = (props: CircleDrawingProps) => {
  const { map, position, radius, onClick } = props;

  const drawingRef = useRef<google.maps.Circle | null>(null);
  const rootRef = useRef<any>(null);

  useEffect(() => {
    if (!rootRef.current) {
      const markerContainer = document.createElement("div");
      rootRef.current = createRoot(markerContainer);

      drawingRef.current = new google.maps.Circle({
        center: position,
        radius,
        strokeColor: "white",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        // fillColor: cupcakeColours["base-content"],
        fillColor: "white",
        fillOpacity: 0.1,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
      });
    }
    return () => {
      if (drawingRef.current) drawingRef.current.setMap(null);
    };
  }, []);

  useEffect(() => {
    if (drawingRef.current) {
      drawingRef.current.setCenter(position);
      drawingRef.current.setRadius(radius);
      drawingRef.current.setMap(map);
    }

    const clickListener = drawingRef.current!.addListener("click", onClick);

    return () => {
      clickListener.remove();
    };
  }, [map, position, radius, onClick]);
};

export default MapCircleDrawing;
