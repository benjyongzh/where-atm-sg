import SearchSection from "@/components/SearchSection";
import FilterSection from "@/components/FilterSection";
import AtmList from "@/components/AtmList";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <main className="relative flex flex-col h-screen gap-6 sm:gap-8 main-bg">
      {/* overflow-hidden */}
      <Navbar />
      <AtmList />
    </main>
  );
};

export default page;
