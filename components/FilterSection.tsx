//components
import FilterButton from "./FilterButton";
import RangeSetting from "./RangeSetting";
import { bankNameList } from "@/lib/load-atm-data";

const FilterSection = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-6 p-5 section">
      <RangeSetting />
      {/* add filter buttons here as well */}
      <ul>
        {bankNameList.map((name) => (
          <FilterButton name={name} />
        ))}
      </ul>
    </div>
  );
};

export default FilterSection;
