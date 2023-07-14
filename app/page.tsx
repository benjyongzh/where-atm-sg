import { bankNameList } from "@/lib/load-atm-data";

//components
import FilterButton from "@/components/FilterButton";
import AtmList from "@/components/AtmList";
import RangeSetting from "@/components/RangeSetting";
import AddressInput from "@/components/AddressInput";

export default async function Home() {
  return (
    <main className="main-bg">
      <header className="w-full text-4xl text-center section">
        Where ATM SG?
      </header>

      <AddressInput updateReduxOnInput={true} />

      <div className="section">
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
