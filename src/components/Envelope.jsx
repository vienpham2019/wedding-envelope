import { useEffect, useRef, useState } from "react";
import envelopeSprite from "../images/envelope-sprite.png";

const TOTAL_FRAMES = 13;
const FRAME_WIDTH = 900;
const FRAME_HEIGHT = 750;

// Total animation duration in milliseconds
const ANIMATION_DURATION = 1500;

// Smooth acceleration and deceleration
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export default function Envelope() {
  const [isOpened, setIsOpened] = useState(false);
  const [frame, setFrame] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const startFrame = isOpened ? 0 : TOTAL_FRAMES - 1;
    const endFrame = isOpened ? TOTAL_FRAMES - 1 : 0;

    // Skip animation on initial render
    if (!startTimeRef.current && !isOpened) {
      return;
    }

    setIsAnimating(true);
    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;

      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

      const easedProgress = easeInOutCubic(progress);

      const currentFrame = Math.round(
        startFrame + (endFrame - startFrame) * easedProgress,
      );

      setFrame(currentFrame);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setFrame(endFrame);
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpened]);

  const handleClick = () => {
    if (isAnimating) return;

    setIsOpened((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isAnimating}
      aria-label={isOpened ? "Close invitation" : "Open invitation"}
      className="
        relative block w-full
        cursor-pointer
        border-0 bg-transparent p-0
        transition-transform duration-500
        hover:scale-[1.02]
        disabled:cursor-default
      "
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: `${FRAME_WIDTH} / ${FRAME_HEIGHT}`,
        }}
      >
        <div
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage: `url(${envelopeSprite})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${TOTAL_FRAMES * 100}% 100%`,
            backgroundPosition: `${(frame / (TOTAL_FRAMES - 1)) * 100}% 0%`,
            willChange: "background-position",
          }}
        />
      </div>
    </button>
  );
}
