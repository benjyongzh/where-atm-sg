import AtmList from "@/components/AtmList";
import Navbar from "@/components/Navbar";
import GoogleMap from "@/components/GoogleMap";
import AtmDetailsModal from "@/components/AtmDetailsModal";

function getKeys() {
  // const res = await fetch(`https://...`)
  // const projects = await res.json()
  const apiKey: string | undefined = process.env.GMAPS_API_KEY;
  const mapId: string | undefined = process.env.GMAPS_MAP_ID_LIGHT;

  return { mapId, apiKey };
}

const page = () => {
  const props = getKeys();

  return (
    <main id="mainContainer" className="defaultPageLayout">
      <Navbar />
      <AtmList />
      <div className="absolute w-full h-full">
        <GoogleMap mapId={props.mapId} apiKey={props.apiKey} />
      </div>
      <AtmDetailsModal />
    </main>
  );
};

export default page;
