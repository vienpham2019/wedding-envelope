import WeddingBorder from "./WeddingBorder";
import weddingBackground from "../images/wedding-background.png";
import botanicalGold1 from "../images/Elegant Ivory Floral Corner Frames Top Left.png";
import botanicalGold2 from "../images/Elegant Ivory Floral Corner Frames Right Bottom.png";

export default function GreedPage() {
  return (
    <main className="relative min-h-screen w-full border overflow-hidden bg-[#F7EBD6]">
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

      {/* Top-left flower */}
      <img
        src={botanicalGold1}
        alt=""
        className="
          pointer-events-none absolute
          left-0 top-0 z-1
          h-auto opacity-70
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
          pointer-events-none absolute
          bottom-0 right-0
          h-auto opacity-70
        "
        style={{
          width: "clamp(120px, 22vw, 550px)",
        }}
      />

      <WeddingBorder color="#C8A46B" inset={24} />

      <div className="relative z-10">{/* Your wedding content */}</div>
    </main>
  );
}
