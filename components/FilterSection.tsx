//components
import FilterButton from "./FilterButton";
import RangeSetting from "./RangeSetting";
import { bankNameList } from "@/lib/atmObject";

const FilterSection = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-6 p-5 section">
      <RangeSetting />

      <ul className="flex flex-wrap items-center justify-center gap-3 p-5">
        {bankNameList.map((name) => (
          <FilterButton name={name} />
        ))}
      </ul>
    </div>
  );
};

export default FilterSection;
