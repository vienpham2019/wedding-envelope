import { useEffect, useRef, useState } from "react";

export default function CircularMusicVisualizer({
  analyser,
  isPlaying,
  barCount = 100,
  color = "#C9924D",
}) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const [size, setSize] = useState(100);

  // Responsive size based on the parent button
  useEffect(() => {
    const button = wrapperRef.current?.parentElement;
    if (!button) return;

    const updateSize = () => {
      const buttonWidth = button.getBoundingClientRect().width;

      // Scale the original 60px canvas to the button size
      setSize(buttonWidth * 1.5);
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(button);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const center = size / 2;
    const radius = size * 0.34;

    const data = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;

    const smooth = new Float32Array(barCount);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frameId;
    let lastFrame = 0;

    const draw = (time = 0) => {
      if (lastFrame && time - lastFrame < 33) {
        frameId = requestAnimationFrame(draw);
        return;
      }

      lastFrame = time;
      ctx.clearRect(0, 0, size, size);

      if (isPlaying && analyser && data && !reducedMotion) {
        analyser.getByteFrequencyData(data);
      }

      for (let i = 0; i < barCount; i++) {
        const angle = (i / barCount) * Math.PI * 2 - Math.PI / 2;

        // Original mirrored frequency mapping
        const position = i / barCount;
        const mirrored = Math.min(position, 1 - position) * 2;

        const bin = Math.floor(
          2 + mirrored * Math.min(90, (data?.length || 92) - 3),
        );

        const amplitude =
          isPlaying && data && !reducedMotion ? data[bin] / 255 : 0;

        const target = 2 + amplitude * 17;

        smooth[i] += (target - smooth[i]) * 0.25;

        const inner = radius;
        const outer = radius + smooth[i];

        ctx.beginPath();

        ctx.moveTo(
          center + Math.cos(angle) * inner,
          center + Math.sin(angle) * inner,
        );

        ctx.lineTo(
          center + Math.cos(angle) * outer,
          center + Math.sin(angle) * outer,
        );

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.8;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      if (isPlaying && analyser && !reducedMotion) {
        frameId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => cancelAnimationFrame(frameId);
  }, [analyser, isPlaying, size, barCount, color]);

  return (
    <span
      ref={wrapperRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: size,
          height: size,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </span>
  );
}
