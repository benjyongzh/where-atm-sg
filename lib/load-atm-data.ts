export async function loadAtmData() {
  const atmData = await fetch("/api/getAtmData");
  const data = await atmData.json();

  console.log("loading atm data: ", data);

  return data;
}
