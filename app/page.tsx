import { AtmData } from "./api/getAtmData/route";
import { getAllAtmData } from "@/lib/load-atm-data";

export default async function Home() {
  const data: AtmData = await getAllAtmData();

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      hello world
      <div>{data.message}</div>
    </main>
  );
}
