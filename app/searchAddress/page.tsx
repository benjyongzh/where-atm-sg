import AtmList from "@/components/AtmList";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import GoogleMap from "@/components/GoogleMap";

const page = () => {
  return (
    <main className="gap-3">
      <Navbar />
      <AtmList />
      <div className="absolute w-full h-full">
        <GoogleMap />
      </div>
    </main>
  );
};

export default page;
