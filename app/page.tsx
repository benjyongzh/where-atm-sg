//components
import SearchSection from "@/components/SearchSection";
import FilterSection from "@/components/FilterSection";
import AtmList from "@/components/AtmList";

export default async function Home() {
  return (
    <main className="main-bg">
      <header className="text-4xl text-center page-header">
        Where ATM SG?
      </header>

      <SearchSection />
      <FilterSection />
      <AtmList />
    </main>
  );
}
