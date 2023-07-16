//components
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex flex-col gap-6 sm:gap-8 main-bg">
      <header className="text-4xl text-center page-header">
        Where ATM SG?
      </header>
      {/* buttons for nav */}
      <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
        <Link href="/currentLoc" className="w-full btn btn-primary sm:w-36">
          Use my location
        </Link>
        <Link href="/staticLoc" className="w-full btn btn-secondary sm:w-36">
          Search Address
        </Link>
      </div>
    </main>
  );
}
