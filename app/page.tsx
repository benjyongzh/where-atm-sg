import { getAllAtmData } from "@/lib/load-atm-data";
import { rawAtmInfo } from "@/lib/webscraping-data";

export default async function Home() {
  const data = await getAllAtmData();

  return data ? (
    data.atmList ? (
      <main className="flex flex-col items-center justify-between min-h-screen p-24">
        {data.atmList.map((atm: rawAtmInfo) => (
          <div>
            <div>{atm.name}</div>
            <div>{atm.address}</div>
            <div>{atm.postalCode}</div>
          </div>
        ))}
      </main>
    ) : (
      <main className="flex flex-col items-center justify-between min-h-screen p-24">
        {data.message}
      </main>
    )
  ) : (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      loading
    </main>
  );
}
