import WeddingBorder from "./WeddingBorder";
import weddingBackground from "../images/wedding-background.png";
import botanicalGold1 from "../images/botanicalGold1.png";
import botanicalGold2 from "../images/botanicalGold2.png";
import wreathFrameTopLeft from "../images/wreathFrameTopLeft.png";
import wreathFrameBottomRight from "../images/wreathFrameBottomRight.png";
import butterfly from "../images/Peach Butterfly with Golden Flight Trail.png";
import paperSplash from "../images/Beige Watercolor Paper Splash.png";
import stamp from "../images/Vintage Botanical Postage Stamp Duo.png";
import Envelope from "./Envelope";
import HeartDivider from "./divider/HeartDivider";
import WeddingNames from "./WeddingName";

export default function GreedPage() {
  return (
    <main
      className="
     flex items-center justify-center xl:pt-0 pt-10
    relative  w-full overflow-hidden bg-[#F7EBD6]
    h-screen
    lg:min-h-[1000px]
    "
    >
      {/* Background */}
      <div
        className="
              pointer-events-none absolute inset-0
              bg-cover bg-center bg-no-repeat
            "
        style={{
          backgroundImage: `url(${weddingBackground})`,
        }}
      />
      <WeddingBorder color="#C8A46B" inset={24} />

      {/* Top-left stamp */}
      <img
        src={stamp}
        alt=""
        className="
          ink-reveal
          pointer-events-none absolute
          right-[0.5rem] top-[0.5rem]
          opacity-85
          h-auto drop-shadow-sm drop-shadow-gray-950
           w-[7rem]
           md:w-[150px]
            lg:w-[200px]
           xl:w-[250px]
        "
      />
      {/* Top-left flower */}
      <img
        src={botanicalGold1}
        alt=""
        className="
          ink-reveal
          pointer-events-none absolute
          left-0 top-0
          opacity-90
          h-auto drop-shadow-sm drop-shadow-gray-950
        "
        style={{
          width: "clamp(120px, 22vw, 550px)",
        }}
      />
      {/* Bottom-right flower */}
      <img
        src={botanicalGold2}
        alt=""
        className="
          ink-reveal
          pointer-events-none absolute
          bottom-0 right-0
           opacity-90
          h-auto drop-shadow-sm drop-shadow-gray-950
        "
        style={{
          width: "clamp(120px, 22vw, 550px)",
        }}
      />
      <div
        className=" grid place-items-center
    xl:flex xl:items-center xl:justify-center
    md:gap-10
    w-[90vw] mx-auto"
      >
        {/* Left content */}
        <div
          className="
                relative  flex
                flex-col items-center justify-center
                mb-10 xl:mb-0
                gap-1
                xl:gap-[1rem] text-center text-[#676f64]
                 w-[70vw]
           md:w-[200px]
           xl:w-[600px]
              "
        >
          <span className="font-[Judson] text-[0.6rem] uppercase tracking-[0.2em] md:text-[1rem] xl:text-[1.3rem]">
            Save The Date
          </span>
          <HeartDivider width="1rem" maxWidth="15rem" color="#DCB685" />

          <h2 className="font-[benne] text-[1rem] uppercase tracking-wider md:text-[1.5rem] lg:text-[2rem] xl:text-[3rem]">
            Thiên Tâm
          </h2>

          <p className="max-w-[30rem] font-[Judson] text-[0.6rem] italic leading-relaxed sm:text-[1rem] xl:text-[1.4rem]">
            With love, we invite you
            <br />
            to celebrate with us
          </p>
        </div>

        {/* Main Envelope Container */}
        <div
          className="
            relative z-2
            flex aspect-square
            items-center justify-center
            overflow-visible
           h-auto
        w-[70vw]
            md:w-[50vw]
            lg:w-[400px]
           xl:w-[700px]
           px-4
          "
        >
          {/* Wreath - allow overflow */}
          <img
            src={paperSplash}
            alt=""
            className="
              ink-reveal
              pointer-events-none
              absolute
              left-[50%] top-[40%]
               w-[clamp(80vw,120%,100px)]
              opacity-30
              h-auto
              -translate-x-1/2
              -translate-y-1/2
            "
          />
          <img
            src={wreathFrameTopLeft}
            alt=""
            className="
              ink-reveal
              pointer-events-none
              absolute
              left-[25%] top-[30%]
              w-[70%] max-w-none
              opacity-80
              h-auto
              -translate-x-1/2
              -translate-y-1/2
              
            "
          />
          <img
            src={wreathFrameBottomRight}
            alt=""
            className="
              ink-reveal
              pointer-events-none
              absolute
              -right-[15%] -bottom-[10%]
              w-[60%] max-w-none
              opacity-80
              h-auto
              -translate-y-1/2
            "
          />

          <img
            src={butterfly}
            alt=""
            className="
              ink-reveal
              pointer-events-none
              absolute
              -right-[20%] -top-[10%]
              w-[60%] max-w-none
              opacity-80
              h-auto
               drop-shadow-lg drop-shadow-gray-950
            "
          />

          <div className="relative w-full ink-reveal">
            <Envelope />
          </div>
          {/* </div> */}
          {/* Envelope */}
        </div>
        {/* Right content */}
        <div
          className="
         w-[70vw]
         md:w-[400px]
           lg:w-[400px]
           xl:w-[600px]
          relative  flex
          flex-col items-center justify-center
          md:gap-2 text-center text-[#676f64]

        "
        >
          <span className="font-[Judson] text-[0.6rem] uppercase tracking-[0.2em] md:text-[1rem] xl:text-[1.3rem] xl:mb-3">
            The Wedding Of
          </span>

          <WeddingNames />
          <HeartDivider width="2rem md:1rem" maxWidth="15rem" color="#DCB685" />
          <span className="font-Hurricane text-[1rem] tracking-[0.15em] md:text-[2rem] xl:text-[2.5rem] font-semibold">
            04.11.2027
          </span>
        </div>
      </div>
    </main>
  );
}
