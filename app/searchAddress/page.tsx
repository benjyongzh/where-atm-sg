import AtmList from "@/components/AtmList";
import Navbar from "@/components/Navbar";
import GoogleMap from "@/components/GoogleMap";
import AtmDetailsModal from "@/components/AtmDetailsModal";

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
