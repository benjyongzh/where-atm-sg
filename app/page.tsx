import { errorMessageObject } from "@/lib/errors";
import { getAllAtmData, bankNameList } from "@/lib/load-atm-data";

import FilterButton from "@/components/FilterButton";
import AtmList from "@/components/AtmList";

export default async function Home() {
  //save atmList to redux?
  // const dataToUse = await getAllAtmData();
  // const { atmList, errors } = dataToUse;

  return (
    <main className="flex flex-col items-stretch justify-start min-h-screen gap-8 p-24">
      <header className="w-full m-5 text-xl text-center">Where ATM SG?</header>
      <div className="flex flex-wrap items-center justify-center gap-3 p-5">
        {bankNameList.map((bank) => (
          <FilterButton key={bank + "filterbutton"} name={bank} />
        ))}
      </div>

      <AtmList />
    </main>
  );
}
