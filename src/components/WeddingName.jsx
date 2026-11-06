import "../WeddingNames.css";

export default function WeddingNames() {
  const fontFamily = "Arizonia, cursive";

  return (
    <div className="w-full flex justify-center px-4">
      {/* Mobile + Tablet: one line */}
      <svg viewBox="0 0 600 100" className="block xl:hidden w-full  h-auto">
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
      <svg viewBox="0 0 500 260" className="hidden xl:block w-full">
        {/* Top: left */}
        <g className="draw-name">
          <text
            x="50"
            y="65"
            textAnchor="start"
            fontFamily={fontFamily}
            fontSize="90"
          >
            Ngọc Ngà
          </text>
        </g>
        <g className="draw-name draw-name-delay-1">
          <text
            x="200"
            y="155"
            textAnchor="start"
            fontFamily={fontFamily}
            fontSize="50"
          >
            &amp;
          </text>
        </g>

        {/* Bottom: right */}
        <g className="draw-name draw-name-delay-2">
          <text
            x="420"
            y="235"
            textAnchor="end"
            fontFamily={fontFamily}
            fontSize="90"
          >
            Hoàng Viên
          </text>
        </g>
      </svg>
    </div>
  );
}
