import weddingBackground from "../images/wedding-background.png";
import botanicalGold1 from "../images/Botanical Gold 1.png";
import botanicalGold2 from "../images/Botanical Gold 2.png";
import botanicalGold3 from "../images/Botanical Gold 3.png";
import stamp from "../images/Vintage Botanical Postage Stamp Duo.png";
import Envelope from "./Envelope";
import WeddingDivider from "./WeddingDivider";
import WeddingNames from "./WeddingName";
const GreedPage = () => {
  return (
    <div
      className="
    relative flex min-h-screen w-full
    flex-col items-center justify-center
    overflow-hidden
    px-5 py-12
    text-[#414C3D]
    sm:px-8
    lg:flex-row lg:gap-8 lg:px-12
    2xl:gap-12
  "
    >
      {/* Background */}
      <div
        className="
      pointer-events-none absolute inset-0 z-0
      bg-cover bg-center bg-no-repeat
    "
        style={{
          backgroundImage: `url(${weddingBackground})`,
        }}
      />

      {/* Gold border */}
      <div
        className="
      pointer-events-none absolute
      inset-3 z-[1]
      border border-[#CAB74D]
      sm:inset-5
      lg:inset-8
      2xl:inset-10
    "
      />

      {/* Top-left flower */}
      <img
        src={botanicalGold1}
        alt=""
        className="
    pointer-events-none absolute
    left-0 top-0 z-[2]
    h-auto opacity-70
  "
        style={{
          width: "clamp(120px, 22vw, 550px)",
        }}
      />

      {/* Bottom-left flower */}
      <img
        src={botanicalGold2}
        alt=""
        className="
    pointer-events-none absolute
    bottom-0 left-0 z-[2]
    h-auto opacity-70
  "
        style={{
          width: "clamp(120px, 22vw, 550px)",
        }}
      />

      {/* Bottom-right flower */}
      <img
        src={botanicalGold3}
        alt=""
        className="
    pointer-events-none absolute
    bottom-0 right-0 z-[2]
    h-auto opacity-70
  "
        style={{
          width: "clamp(120px, 22vw, 550px)",
        }}
      />

      {/* Top-right stamp */}
      <img
        src={stamp}
        alt=""
        className="
    pointer-events-none absolute
    right-0 top-0 z-2
    h-auto opacity-70
  "
        style={{
          width: "clamp(90px, 12vw, 300px)",
        }}
      />

      {/* Left content */}
      <div
        className="
    relative z-10 flex w-full
    flex-col items-center justify-center
    gap-[2rem] text-center text-[#676f64]
    lg:w-[25%]
    xl:w-[22%]
  "
      >
        <span className="font-[Judson] text-[1rem] uppercase tracking-[0.2em] sm:text-[1.5rem]">
          The Wedding Of
        </span>

        <WeddingDivider width="3rem" maxWidth="25rem" color="#CAB74D" />

        <h2 className="font-[benne] text-4xl uppercase tracking-wider sm:text-5xl xl:text-6xl">
          Thiên Tâm
        </h2>

        <p className="max-w-[30rem] font-[Judson] text-[1rem] italic leading-relaxed sm:text-[1.6rem]">
          With love, we invite you
          <br />
          to celebrate with us
        </p>
      </div>

      {/* Main envelope */}
      <div
        className="
      relative z-10 flex
      w-full max-w-[900px]
      items-center justify-center
      lg:w-[55%]
      xl:w-[58%]
    "
      >
        <Envelope />
      </div>

      {/* Right content */}
      <div
        className="
    relative z-10 flex w-full
    flex-col items-center justify-center
    gap-5 text-center text-[#676f64] 
    lg:w-[25%]
    xl:w-[22%]
  "
      >
        <span className="font-[Judson] text-[1rem] uppercase tracking-[0.2em] sm:text-[1.5rem]">
          Save The Date
        </span>

        {/* <WeddingDivider width="2rem" maxWidth="25rem" color="#CAB74D" /> */}

        <WeddingNames />

        {/* <WeddingDivider width="2rem" maxWidth="25rem" color="#CAB74D" /> */}

        <span className="mt-1 font-Hurricane text-[1rem] tracking-[0.15em] sm:text-[3rem]">
          04.11.2027
        </span>
      </div>
    </div>
  );
};

export default GreedPage;
