import { IAtmObject } from "@/lib/atmObject";
import { GiPathDistance } from "react-icons/gi";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { setSelectedAtmPlaceId } from "@/features/atmData/atmDataSlice";

type AtmListItemProps = {
  atmData: IAtmObject;
};

const AtmListItem = (props: AtmListItemProps) => {
  const dispatch = useAppDispatch();
  const storedSelectedAtmId = useAppSelector(
    (state) => state.atmData.selectedAtmPlaceId
  );
  const { atmData: atm } = props;

  const handleClick = () => {
    dispatch(setSelectedAtmPlaceId(atm.place_id));
  };

  return (
    <button
      className={`w-full card ${
        storedSelectedAtmId === atm.place_id
          ? "bg-primary-focus hover:bg-primary"
          : "bg-base-300 hover:bg-base-200"
      } `}
      type="button"
      onClick={handleClick}
    >
      <div className="flex flex-col items-start justify-between w-full gap-0 p-4 card-body">
        <div className="flex items-center justify-between w-full">
          <p className="text-xl card-title">{atm.brand}</p>
          <div className="flex items-center justify-start gap-3">
            <GiPathDistance />
            {atm.distance}m
          </div>
        </div>

        <p className="flex text-start">{atm.address}</p>
      </div>
    </button>
  );
};

export default AtmListItem;
