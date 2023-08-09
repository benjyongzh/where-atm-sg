"use client";

import { useState, useEffect } from "react";

import MapInfoWindowData from "./MapInfoWindowData";

import { IAtmObject } from "@/lib/atmObject";

import { useAppSelector } from "@/hooks/reduxHooks";

import { motion, AnimatePresence } from "framer-motion";
import { atmDetailModalVariant } from "@/lib/framerVariants";

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

  return (
    <AnimatePresence>
      {mediaBreakpoint !== "xs" || !atmData ? null : (
        <motion.div
          variants={atmDetailModalVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="relative z-10 flex flex-col items-stretch max-w-5xl mt-auto"
        >
          <div className="card nav-bg">
            <div className="card-body">
              <MapInfoWindowData atmData={atmData} />
              <div className="justify-end card-actions">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AtmDetailsModal;
