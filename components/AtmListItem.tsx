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
    dispatch(setSelectedAtmPlaceId(atm.place_id));
  };

  const handleMouseOver = (over: boolean) => {
    if (over) {
      dispatch(setOnHoverAtmPlaceId(atm.place_id));
    } else {
      dispatch(setOnHoverAtmPlaceId(null));
    }
  };

  return (
    <button
      className={`w-full card flex-none ${
        storedSelectedAtmId === atm.place_id
          ? "bg-primary"
          : storedHoveredAtmId === atm.place_id
          ? "bg-secondary"
          : "bg-neutral-content"
      } `}
      type="button"
      onClick={handleClick}
      onMouseOver={() => handleMouseOver(true)}
      onMouseLeave={() => handleMouseOver(false)}
    >
      <div className="flex flex-col items-start justify-between w-full gap-0 px-4 py-2 card-body">
        <div className="flex items-center justify-between w-full">
          <p className="text-lg card-title">{atm.brand}</p>
          <div className="flex items-center justify-start gap-3 text-sm">
            <GiPathDistance />
            {atm.distance}m
          </div>
        </div>

        <p className="flex text-sm text-start">{atm.address}</p>
      </div>
    </button>
  );
};

export default AtmListItem;
