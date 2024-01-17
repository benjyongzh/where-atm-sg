import AtmList from "@/components/AtmList";
import Navbar from "@/components/Navbar";
import GoogleMap from "@/components/GoogleMap";
import AtmDetailsModal from "@/components/AtmDetailsModal";
import ErrorMessageModal from "@/components/ErrorMessageModal";

const page = () => {
  return (
    <main id="mainContainer" className="defaultPageLayout">
      <Navbar />
      <ErrorMessageModal />
      <AtmList />
      <div className="absolute w-full h-full">
        <GoogleMap />
      </div>
      <AtmDetailsModal />
    </main>
  );
};

export default page;
