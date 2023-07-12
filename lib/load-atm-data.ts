export async function getAllAtmData() {
  const atmData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}getAtmData`);
  const data = await atmData.json();
  return data;
}
