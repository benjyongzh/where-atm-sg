import { bankNameList } from "@/lib/load-atm-data";

//components
import FilterButton from "@/components/FilterButton";
import AtmList from "@/components/AtmList";
import RangeSetting from "@/components/RangeSetting";
import AddressInput from "@/components/AddressInput";

export default async function Home() {
  return (
    <main className="flex flex-col items-stretch justify-start min-h-screen gap-8 p-24">
      <header className="w-full m-5 text-xl text-center">Where ATM SG?</header>
      <div className="flex items-center justify-center gap-3 p-5">
        <AddressInput updateReduxOnInput={true} />
      </div>
      <div className="flex items-center justify-center gap-3 p-5">
        <RangeSetting />
      </div>
      {/* 
      <div className="flex flex-wrap items-center justify-center gap-3 p-5">
        {bankNameList.map((bank) => (
          <FilterButton key={bank + "filterbutton"} name={bank} />
        ))}
      </div>

      <AtmList /> */}
    </main>
  );
}
