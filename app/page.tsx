import { errorMessageObject } from "@/lib/errors";
import { getAllAtmData, bankNameList } from "@/lib/load-atm-data";

import FilterButton from "@/components/FilterButton";
import AtmList from "@/components/AtmList";

export default async function Home() {
  //save atmList to redux?
  const dataToUse = await getAllAtmData();
  const { atmList, errors } = dataToUse;

  return atmList.length || errors.length ? (
    <main className="flex flex-col items-stretch justify-start min-h-screen gap-8 p-24">
      <header className="w-full m-5 text-xl text-center">Where ATM SG?</header>
      <div className="flex flex-wrap items-center justify-center gap-3 p-5">
        {bankNameList.map((bank) => (
          <FilterButton key={bank + "filterbutton"} name={bank} />
        ))}
      </div>

      {errors.map((error: errorMessageObject, index: number) => (
        <div key={index}>
          <div>{error.errorMessage}</div>
        </div>
      ))}

      <AtmList />
    </main>
  ) : (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      loading
    </main>
  );
}
