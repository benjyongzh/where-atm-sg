import { IAtmObject } from "@/lib/atmObject";
import { GiPathDistance } from "react-icons/gi";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import {
  setSelectedAtmPlaceId,
  setOnHoverAtmPlaceId,
} from "@/features/atmData/atmDataSlice";

type AtmListItemProps = {
  atmData: IAtmObject;
};

const AtmListItem = (props: AtmListItemProps) => {
  const dispatch = useAppDispatch();
  const storedSelectedAtmId = useAppSelector(
    (state) => state.atmData.selectedAtmPlaceId
  );
  const storedHoveredAtmId = useAppSelector(
    (state) => state.atmData.onHoverAtmPlaceId
  );
  const { atmData: atm } = props;

  const handleClick = () => {
    dispatch(setOnHoverAtmPlaceId(atm.place_id));
    if (storedSelectedAtmId !== atm.place_id) {
      dispatch(setSelectedAtmPlaceId(atm.place_id));
    } else {
      dispatch(setSelectedAtmPlaceId(null));
    }
  };

  const handleMouseOver = (over: boolean) => {
    dispatch(setOnHoverAtmPlaceId(over ? atm.place_id : null));
  };

  return (
    <li className="w-full">
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
        <div className="flex items-center justify-between w-full px-4 py-0 collapse-title">
          <p>{atm.brand}</p>
          <div className="flex items-center justify-start gap-3 text-sm">
            <GiPathDistance />
            {atm.distance}m
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full collapse-content">
          <p className="flex text-sm text-start">{atm.address}</p>
        </div>
      </div>
    </li>
  );
};

export default AtmListItem;
