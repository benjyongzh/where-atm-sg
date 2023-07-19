//components
import FilterButton from "./FilterButton";
import RangeSetting from "./RangeSetting";
import { bankFilters } from "@/lib/atmObject";

const FilterSection = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-5 section">
      <RangeSetting />

      <ul className="flex flex-wrap items-center justify-center max-w-3xl gap-3">
        {bankFilters.map((filter, i) => (
          <FilterButton banks={filter.banks} key={i} />
        ))}
      </ul>
    </div>
  );
};

export default FilterSection;
