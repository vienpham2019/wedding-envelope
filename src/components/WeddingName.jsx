import "../WeddingNames.css";

export default function WeddingNames() {
  const fontFamily = "Hurricane, cursive";

  return (
    <div className="w-full flex justify-center px-4">
      {/* Mobile + Tablet: one line */}
      <svg
        viewBox="0 0 600 100"
        className="block lg:hidden w-full max-w-[600px] h-auto"
      >
        <g className="draw-name">
          <text
            x="300"
            y="75"
            textAnchor="middle"
            fontFamily={fontFamily}
            fontSize="62"
          >
            Ngọc Ngà &amp; Hoàng Viên
          </text>
        </g>
      </svg>

      {/* Desktop: three lines */}
      <svg
        viewBox="0 0 500 260"
        className="hidden lg:block w-full max-w-[500px] h-auto"
      >
        {/* Top: left */}
        <g className="draw-name">
          <text
            x="30"
            y="85"
            textAnchor="start"
            fontFamily={fontFamily}
            fontSize="76"
          >
            Ngọc Ngà
          </text>
        </g>

        {/* Center */}
        <g className="draw-name draw-name-delay-1">
          <text
            x="250"
            y="143"
            textAnchor="middle"
            fontFamily={fontFamily}
            fontSize="54"
          >
            &amp;
          </text>
        </g>

        {/* Bottom: right */}
        <g className="draw-name draw-name-delay-2">
          <text
            x="470"
            y="215"
            textAnchor="end"
            fontFamily={fontFamily}
            fontSize="76"
          >
            Hoàng Viên
          </text>
        </g>
      </svg>
    </div>
  );
}
