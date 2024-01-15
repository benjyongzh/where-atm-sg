//react
import { useRef, useEffect, useState } from "react";

//icons
import { GiPathDistance } from "react-icons/gi";
import { FaWalking } from "react-icons/fa";

//libraries
import { IAtmObject } from "@/lib/atmObject";

//redux
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import {
  setSelectedAtmPlaceId,
  setOnHoverAtmPlaceId,
} from "@/features/atmData/atmDataSlice";

//features
import {
  handleUpdateDirections,
} from "@/features/googleAPI/directions";
import { IGeoCode } from "@/features/googleAPI/geocoder";

type AtmListItemProps = {
  atmData: IAtmObject;
};

const AtmListItem = (props: AtmListItemProps) => {
  const { atmData: atm } = props;
  const [loadedDirections, setLoadedDirections] = useState(false);
  const dispatch = useAppDispatch();
  const listItemRef = useRef<HTMLLIElement>(null);
  const storedSelectedAtmId = useAppSelector(
    (state) => state.atmData.selectedAtmPlaceId
  );
  const storedHoveredAtmId = useAppSelector(
    (state) => state.atmData.onHoverAtmPlaceId
  );

  const storedSearchPoint: IGeoCode = useAppSelector(
    (state) => state.settings.searchLocationPoint
  );

  const handleClick = () => {
    dispatch(setOnHoverAtmPlaceId(atm.place_id));
    if (storedSelectedAtmId !== atm.place_id) {
      dispatch(setSelectedAtmPlaceId(atm.place_id));
      if (!atm.directions || !loadedDirections) {
        setLoadedDirections(true);
        updateAtmDirections();
      }
    } else {
      dispatch(setSelectedAtmPlaceId(null));
    }
  };

  const handleMouseOver = (over: boolean) => {
    dispatch(setOnHoverAtmPlaceId(over ? atm.place_id : null));
  };

  const updateAtmDirections = () => {
    handleUpdateDirections(storedSearchPoint, atm, setLoadedDirections);
  }

  useEffect(() => {
    if (listItemRef.current && storedSelectedAtmId === atm.place_id) {
      listItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [storedSelectedAtmId]);

  return (
    <li className="w-full" ref={listItemRef}>
      <div
        className={`collapse ${
          storedSelectedAtmId === atm.place_id
            ? "bg-primary"
            : storedHoveredAtmId === atm.place_id
            ? "bg-secondary"
            : "bg-neutral-content"
        }`}
        onClick={handleClick}
        onMouseOver={() => handleMouseOver(true)}
        onMouseLeave={() => handleMouseOver(false)}
      >
        <input type="checkbox" checked={storedSelectedAtmId === atm.place_id} />
        <div className="flex items-center justify-between w-full px-4 collapse-title">
          <p>{atm.brand}</p>
          <div className="flex items-center justify-start gap-3 text-sm">
            <GiPathDistance />
            {atm.distance}m
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-2 collapse-content">
          <p className="flex text-sm text-start">
            <FaWalking />
            <span>&nbsp;</span>
            {loadedDirections ? (
              <span>
                {atm.directions ? (
                  atm.directions.duration
                ) : (
                  <span className="loading loading-spinner loading-xs"></span>
                )}{" "}
                mins
              </span>
            ) : (
              <span className="text-error">
                Failed to load walking distance
              </span>
            )}
          </p>
          <p className="flex text-sm text-start">{atm.address}</p>
        </div>
      </div>
    </li>
  );
};

export default AtmListItem;
