import weddingBackground from "../images/wedding-background.png";
import botanicalGold1 from "../images/Botanical Gold 1.png";
import botanicalGold2 from "../images/Botanical Gold 2.png";
import botanicalGold3 from "../images/Botanical Gold 3.png";
import Envelope from "./Envelope";
const GreedPage = () => {
  return (
    <div className="relative flex min-h-screen w-[1920px] items-center justify-center overflow-hidden text-[#414C3D]">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${weddingBackground})`,
        }}
      />
      <div
        className="w-[96%] h-[90%] border border-[#CAB74D] absolute top-1/2 left-1/2
               -translate-x-1/2 -translate-y-1/2"
      />

      <img
        className="pointer-events-none w-100 absolute inset-0 opacity-70"
        src={botanicalGold1}
        alt="botanicalGold1"
      />
      <img
        className="pointer-events-none w-100 absolute bottom-4 left-0 opacity-70"
        src={botanicalGold2}
        alt="botanicalGold2"
      />
      <img
        className="pointer-events-none w-100 absolute bottom-0 right-0 opacity-70"
        src={botanicalGold3}
        alt="botanicalGold3"
      />

      {/* Main Content */}
      <div className="relative flex items-center z-10 h-[540px] w-[880px] max-w-full ">
        {/* Wedding invitation content */}
        <Envelope />
      </div>
    </div>
  );
};

export default GreedPage;
