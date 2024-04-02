import AtmList from "@/app/_components/AtmList";
import Navbar from "@/app/_components/Navbar";
import GoogleMap from "@/app/_components/mapItems/GoogleMap";
import AtmDetailsModal from "@/app/_components/AtmDetailsModal";

const page = () => {
  return (
    <main id="mainContainer" className="defaultPageLayout">
      <Navbar />
      <AtmList />
      <div className="absolute w-full h-full">
        <GoogleMap apiKey={process.env.GMAPS_API_KEY} />
      </div>
      <AtmDetailsModal />
    </main>
  );
};

export default page;
