import { IAtmObject } from "@/lib/atmObject";
import { GiPathDistance } from "react-icons/gi";

type AtmListItemProps = {
  atmData: IAtmObject;
  selectAtm: Function;
  selected: boolean;
};

const AtmListItem = (props: AtmListItemProps) => {
  const { atmData, selectAtm, selected } = props;
  const { atmData: atm } = props;
  return (
    <button
      className={`w-full card ${
        selected
          ? "bg-primary-focus hover:bg-primary"
          : "bg-base-300 hover:bg-base-200"
      } `}
      type="button"
      onClick={() => selectAtm(atmData.place_id)}
    >
      <div className="flex flex-col items-start justify-between w-full gap-0 p-3 sm:p-4 card-body">
        <div className="flex items-center justify-between w-full">
          <p className="text-lg sm:text-xl card-title">{atm.brand}</p>
          <div className="flex items-center justify-start gap-3">
            <GiPathDistance />
            {atm.distance}m
          </div>
        </div>

        <p className="hidden text-sm text-start sm:text-base sm:flex">
          {atm.address}
        </p>
      </div>
    </button>
  );
};

export default AtmListItem;
