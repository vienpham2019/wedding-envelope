export default function WeddingDivider({
  width = "3rem",
  maxWidth = "30rem",
  color = "#CAB74D",
  className = "",
}) {
  return (
    <div
      className={`mx-auto flex w-full items-center gap-3 ${className}`}
      style={{ maxWidth }}
    >
      <div className="h-px flex-1" style={{ backgroundColor: color }} />

      <span
        className="shrink-0 leading-none"
        style={{ color, fontSize: width }}
      >
        ❦
      </span>

      <div className="h-px flex-1" style={{ backgroundColor: color }} />
    </div>
  );
}
