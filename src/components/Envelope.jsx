import { useEffect, useRef, useState } from "react";
import envelopeSprite from "../images/envelope-sprite.png";
import invitationCard from "../images/Invitation-card.png";

const TOTAL_FRAMES = 20;
const FRAME_WIDTH = 900;
const FRAME_HEIGHT = 900;

const ANIMATION_DURATION = 1900;
const CARD_DURATION = 1800;

// Invitation settings
const CARD_WIDTH = "80%";
const CARD_START_TOP = 0;
const CARD_END_TOP = 35;

const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export default function Envelope() {
  const [isOpened, setIsOpened] = useState(false);
  const [frame, setFrame] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardProgress, setCardProgress] = useState(0);

  const animationRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const animate = (duration, onUpdate, onComplete) => {
    cancelAnimationFrame(animationRef.current);

    let startTime = null;

    const step = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      onUpdate(eased);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        onComplete?.();
      }
    };

    animationRef.current = requestAnimationFrame(step);
  };

  const handleClick = () => {
    if (isAnimatingRef.current || isOpened) return;

    isAnimatingRef.current = true;
    setIsAnimating(true);

    // STEP 1: Open envelope
    animate(
      ANIMATION_DURATION,
      (progress) => {
        setFrame(Math.round(progress * (TOTAL_FRAMES - 1)));
      },
      () => {
        setFrame(TOTAL_FRAMES - 1);
        setCardProgress(0);

        // STEP 2: Move invitation down and scale
        animate(
          CARD_DURATION,
          (progress) => {
            setCardProgress(progress);
          },
          () => {
            setCardProgress(1);
            setIsOpened(true);
            setIsAnimating(false);
            isAnimatingRef.current = false;
          },
        );
      },
    );
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const cardTop =
    CARD_START_TOP + (CARD_END_TOP - CARD_START_TOP) * cardProgress;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isAnimating || isOpened}
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
        className="relative w-full"
        style={{
          aspectRatio: `${FRAME_WIDTH} / ${FRAME_HEIGHT}`,
        }}
      >
        {/* Envelope sprite */}
        <div
          className={`absolute inset-0 ${
            !isOpened && !isAnimating ? "envelope-floating" : ""
          }`}
          style={{
            backgroundImage: `url(${envelopeSprite})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${TOTAL_FRAMES * 100}% 100%`,
            backgroundPosition: `${(frame / (TOTAL_FRAMES - 1)) * 100}% 0%`,
          }}
        />

        {/* Floating shadow */}
        {!isOpened && !isAnimating && (
          <div
            className="envelope-shadow absolute left-1/2 bottom-[8%] -z-10"
            style={{
              width: "55%",
              height: "2%",
              borderRadius: "50%",
              background: "rgba(60, 45, 30, 0.35)",
              filter: "blur(18px)",
            }}
          />
        )}

        {/* Invitation - only visible at last frame */}
        {frame > TOTAL_FRAMES - 3 && (
          <img
            src={invitationCard}
            alt="Wedding invitation"
            draggable={false}
            className="absolute left-1/2 object-contain"
            style={{
              width: CARD_WIDTH,
              top: `${cardTop}%`,
              transform: `translateX(-50%) scale(${1 + cardProgress * 0.3})`,
              zIndex: 10,
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </button>
  );
}
