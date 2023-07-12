export async function getAllAtmData() {
  //webscraping done here
  const atmData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}getAtmData`, {
    cache: "no-store",
  }); //for production, set to caching
  const data = await atmData.json();
  return data;
}
