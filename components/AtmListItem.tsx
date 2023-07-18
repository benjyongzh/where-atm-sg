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
      <div className="flex flex-col items-start justify-between w-full p-4 card-body">
        <div className="flex items-start justify-between w-full mb-2">
          <h2 className="card-title">{atm.brand}</h2>
          <div className="flex items-center justify-center gap-3">
            <GiPathDistance />
            {atm.distance}m
          </div>
        </div>

        <p className="text-sm sm:text-base">{atm.address}</p>
      </div>
    </button>
  );
};

export default AtmListItem;
