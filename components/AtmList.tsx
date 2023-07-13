import { rawAtmInfo } from "@/lib/webscraping-data";
import { getAllAtmData } from "@/lib/load-atm-data";
import FilteredAtmList from "./FilteredAtmList";

const AtmList = async () => {
  const atmData = await getAllAtmData();
  const { atmList, errors } = atmData;

  return atmData ? (
    <div>
      <ul>
        {errors.map((error, index) => (
          <div key={index}>error.errorMessage</div>
        ))}
      </ul>
      <FilteredAtmList fullAtmList={atmList} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default AtmList;
