import SearchSection from "@/components/SearchSection";
import FilterSection from "@/components/FilterSection";
import AtmList from "@/components/AtmList";

const page = () => {
  return (
    <main className="flex flex-col gap-6 sm:gap-8 main-bg">
      <header className="text-4xl text-center page-header">
        Where ATM SG?
      </header>

      <SearchSection />
      <FilterSection />
      <AtmList />
    </main>
  );
};

export default page;
