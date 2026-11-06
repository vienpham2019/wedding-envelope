import { useEffect, useRef } from "react";

export default function MusicVisualizer({
  analyser,
  isPlaying,
  barCount = 24,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const frequencyData = analyser
      ? new Uint8Array(analyser.frequencyBinCount)
      : null;

    const smoothHeights = new Float32Array(barCount);
    let animationId;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (analyser && frequencyData && isPlaying) {
        analyser.getByteFrequencyData(frequencyData);
      }

      const gap = 4;
      const barWidth = (width - gap * (barCount - 1)) / barCount;

      for (let i = 0; i < barCount; i++) {
        let targetHeight = 4;

        if (isPlaying && frequencyData) {
          // Focus on frequencies commonly present in music
          const startBin = 2;
          const endBin = Math.min(frequencyData.length - 1, 180);

          const bin = Math.floor(
            startBin + (i / Math.max(1, barCount - 1)) * (endBin - startBin),
          );

          const amplitude = frequencyData[bin] / 255;

          targetHeight = Math.max(4, amplitude * height * 0.95);
        }

        // Smooth movement
        smoothHeights[i] += (targetHeight - smoothHeights[i]) * 0.22;

        const barHeight = Math.max(4, smoothHeights[i]);

        const x = i * (barWidth + gap);
        const y = (height - barHeight) / 2;

        ctx.fillStyle = "#C9924D";

        ctx.beginPath();
        ctx.roundRect(x, y, Math.max(1, barWidth), barHeight, 2);
        ctx.fill();
      }

      if (isPlaying && analyser) {
        animationId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [analyser, isPlaying, barCount]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={50}
      className="block h-[60px] w-[90%]"
      role="img"
      aria-label="Live music visualizer"
    />
  );
}
