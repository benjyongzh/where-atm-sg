import { errorMessageObject } from "@/lib/errors";
import { getAllAtmData } from "@/lib/load-atm-data";
import { rawAtmInfo } from "@/lib/webscraping-data";

export default async function Home() {
  const data = await getAllAtmData();
  const { atmList, errors } = data;

  //save atmList to redux?

  return data ? (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      {errors.map((error: errorMessageObject, index: number) => (
        <div key={index}>
          <div>{error.errorMessage}</div>
        </div>
      ))}
      {atmList.map((atm: rawAtmInfo, index: number) => (
        <div key={index}>
          <div>{atm.location}</div>
          <div>{atm.brand}</div>
          <div>{atm.address}</div>
          <div>
            {atm.info?.map((infoline, i) => (
              <div key={i}>{infoline}</div>
            ))}
          </div>
        </div>
      ))}
    </main>
  ) : (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      loading
    </main>
  );
}
