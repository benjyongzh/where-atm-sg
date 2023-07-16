import { IAtmObject } from "@/lib/atmObject";
import { GiPathDistance } from "react-icons/gi";

const AtmListItem = (props: { atmData: IAtmObject }) => {
  const { atmData: atm } = props;
  return (
    <div className="w-full card bg-base-300 border-neutral-content">
      <div className="card-body">
        <div className="flex items-start justify-between w-full mb-2">
          <h2 className="card-title">{atm.brand}</h2>
          <div className="flex items-center justify-center gap-3">
            <GiPathDistance />
            {atm.distance}m
          </div>
        </div>

        <p className="text-sm sm:text-base">{atm.address}</p>

        {/* <div className="justify-end card-actions">
      <button className="btn btn-primary">Buy Now</button>
    </div> */}
      </div>
    </div>
  );
};

export default AtmListItem;
