import SearchSection from "@/components/SearchSection";
import FilterSection from "@/components/FilterSection";
import AtmList from "@/components/AtmList";
import Link from "next/link";

const page = () => {
  return (
    <main className="flex flex-col h-screen gap-6 sm:gap-8 main-bg">
      {/* overflow-hidden */}
      <Link
        href="/"
        className="text-4xl text-center cursor-pointer page-header"
      >
        Where ATM SG?
      </Link>

      <SearchSection />
      {/* <div className="divider"></div> */}
      <FilterSection />
      {/* <div className="divider"></div> */}
      <AtmList />
    </main>
  );
};

export default page;
