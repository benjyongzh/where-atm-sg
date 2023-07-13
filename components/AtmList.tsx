import { useAppSelector } from "@/hooks/reduxHooks";
import AtmListItem from "./AtmListItem";
import { rawAtmInfo } from "@/lib/webscraping-data";
import { getAllAtmData } from "@/lib/load-atm-data";

const AtmList = async () => {
  const atmData = await getAllAtmData();
  const { atmList, errors } = atmData;
  const storedFilters = useAppSelector((state) => state.settings.bankFilterOut);

  return (
    <ul className="flex flex-col flex-wrap w-full gap-2 p-5">
      {atmList.map((atm: rawAtmInfo, index: number) =>
        storedFilters.includes(atm.brand) ? null : (
          <AtmListItem atmData={atm} key={index} />
        )
      )}
    </ul>
  );
};

export default AtmList;
