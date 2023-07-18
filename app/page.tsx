//components
import Link from "next/link";
import { BiCurrentLocation, BiSearch } from "react-icons/bi";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-start gap-10 pt-52 main-bg">
      <header className="mt-0 text-4xl text-center page-header">
        Where ATM SG?
      </header>
      {/* subheader*/}
      <div className="flex items-center justify-center -mt-5 text-center section">
        Find your nearest ATM with ease and simplicity.
      </div>
      {/* buttons for nav */}
      <div className="flex flex-col items-center justify-center w-full gap-3 sm:max-w-md sm:gap-5 sm:flex-row section">
        <Link href="/useLocation" className="w-full gap-3 btn btn-primary">
          <BiCurrentLocation />
          <span>Use my location</span>
        </Link>
        <Link href="/searchAddress" className="w-full gap-3 btn btn-secondary">
          <BiSearch />
          <span>Search Address</span>
        </Link>
      </div>
    </main>
  );
}
