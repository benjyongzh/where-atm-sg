"use client";

import { useState, useEffect } from "react";

import { IAtmObject } from "@/lib/atmObject";

import { useAppSelector } from "@/hooks/reduxHooks";

const AtmDetailsModal = () => {
  const [atmData, setAtmData] = useState<IAtmObject | null>(null);
  const mediaBreakpoint: string = useAppSelector(
    (state) => state.display.currentBreakpoint
  );

  const storedSelectedAtmId: string | null = useAppSelector(
    (state) => state.atmData.selectedAtmPlaceId
  );

  const fullAtmList: IAtmObject[] = useAppSelector(
    (state) => state.atmData.allAtms
  );

  useEffect(() => {
    if (storedSelectedAtmId !== null && fullAtmList.length) {
      setAtmData(
        fullAtmList.find((atm) => atm.place_id === storedSelectedAtmId)!
      );
    }
  }, [storedSelectedAtmId]);

  return mediaBreakpoint !== "xs" || !atmData ? null : (
    <div className="relative z-10 flex flex-col items-stretch max-w-5xl mt-auto">
      <div className="card nav-bg">
        <div className="card-body">
          <h2 className="card-title">{atmData!.brand}</h2>
          <p>{atmData!.name}</p>
          <p>{atmData!.distance}m</p>
          <p>{atmData!.address}</p>
          <div className="justify-end card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtmDetailsModal;
