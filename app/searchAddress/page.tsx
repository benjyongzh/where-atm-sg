import SearchSection from "@/components/SearchSection";
import FilterSection from "@/components/FilterSection";
import AtmList from "@/components/AtmList";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <main className="fixed flex flex-col h-screen gap-3 main-bg">
      <Navbar />
      <AtmList />
    </main>
  );
};

export default page;
