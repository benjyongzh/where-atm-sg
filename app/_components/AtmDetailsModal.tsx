"use client";

import { useState, useEffect } from "react";

import MapInfoWindowData from "./mapItems/MapInfoWindowData";

import { IAtmObject } from "@/app/_lib/atmObject";

import { useAppSelector } from "@/app/_hooks/reduxHooks";

import { motion, AnimatePresence } from "framer-motion";
import { atmDetailModalVariant } from "@/app/_lib/framerVariants";

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
    } else setAtmData(null);
  }, [storedSelectedAtmId, fullAtmList]);

  return (
    <AnimatePresence>
      {mediaBreakpoint !== "xs" || !atmData ? null : (
        <motion.div
          variants={atmDetailModalVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="relative z-10 flex flex-col items-stretch max-w-5xl mt-auto mb-2"
        >
          <div className="card nav-bg">
            <div className="p-2 card-body w-full">
              <MapInfoWindowData atmData={atmData} />
              <div className="justify-end card-actions">
                <button className="btn btn-primary">Directions</button>
                {/* TODO directions event? */}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AtmDetailsModal;
