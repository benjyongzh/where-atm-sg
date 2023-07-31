//components
import FilterButton from "./FilterButton";
import RangeSetting from "./RangeSetting";
import { bankFilters } from "@/lib/atmObject";

const FilterSection = () => {
  return (
    <div className="flex flex-col items-stretch justify-center w-full max-w-5xl gap-4 mx-auto lg:items-start">
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
