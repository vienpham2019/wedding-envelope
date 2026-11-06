import { useEffect, useRef, useState } from "react";

import weddingMusic1 from "../../assets/ngay dau tien.mp3";
import weddingMusic2 from "../../assets/Ánh Nắng Của Anh.mp3";
import weddingMusic3 from "../../assets/le-duong.mp3";
import weddingMusic4 from "../../assets/Shane Filan  Beautiful In White.mp3";
import weddingMusic5 from "../../assets/Dan  Shay Justin Bieber.mp3";
import weddingMusic6 from "../../assets/ta la cua nhau.mp3";
import buttonFlower from "../../images/MusicButtonFlower.png";
import CircularMusicVisualizer from "./CircularMusicVisualizer";

import {
  MdMusicNote,
  MdMusicOff,
  MdChevronLeft,
  MdChevronRight,
  MdPlayArrow,
  MdPause,
} from "react-icons/md";

// Add your songs here
const songs = [
  {
    id: 1,
    title: "Lễ Đường",
    artist: "Kai Đinh",
    src: weddingMusic3,
  },
  {
    id: 2,
    title: "Ánh Nắng Của Anh",
    artist: "Đức Phúc",
    src: weddingMusic2,
  },
  {
    id: 3,
    title: "Ngày Đầu Tiên",
    artist: "Đức Phúc",
    src: weddingMusic1,
  },
  {
    id: 4,
    title: "Beautiful In White",
    artist: "Shane Filan",
    src: weddingMusic4,
  },
  {
    id: 5,
    title: "Ta là của nhau",
    artist: "Đông Nhi, Ông Cao Thắng",
    src: weddingMusic6,
  },
  {
    id: 6,
    title: "10,000 hours",
    artist: "Dan + Shay, Justin Bieber",
    src: weddingMusic5,
  },
];

export default function WeddingMusicPlayer() {
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [analyser, setAnalyser] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(0);
  useEffect(() => {
    if (!isPanelOpen) return;

    const handleClickOutside = (event) => {
      if (playerRef.current && !playerRef.current.contains(event.target)) {
        setIsPanelOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsPanelOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isPanelOpen]);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;

    return () => {
      audio.pause();

      if (audioContextRef.current) {
        void audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const setupAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioContextRef.current) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      const context = new AudioContextClass();
      const source = context.createMediaElementSource(audio);
      const analyserNode = context.createAnalyser();

      analyserNode.fftSize = 512;
      analyserNode.smoothingTimeConstant = 0.8;

      source.connect(analyserNode);
      analyserNode.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyserNode;

      setAnalyser(analyserNode);
    }

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }
  };

  const playNextSong = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Move to next song, or return to first song
    const nextIndex = (selectedSong + 1) % songs.length;

    setSelectedSong(nextIndex);

    audio.src = songs[nextIndex].src;
    audio.load();

    try {
      await setupAudio();
      await audio.play();
    } catch (error) {
      console.error("Failed to play next song:", error);
    }
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await setupAudio();
      await audio.play();
    } catch (error) {
      console.error("Music playback failed:", error);
    }
  };

  const selectSong = async (index) => {
    const audio = audioRef.current;
    if (!audio || index === selectedSong) return;

    const wasPlaying = !audio.paused;

    audio.pause();
    audio.src = songs[index].src;
    audio.load();

    setSelectedSong(index);

    if (wasPlaying) {
      try {
        await setupAudio();
        await audio.play();
      } catch (error) {
        console.error("Song playback failed:", error);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={songs[0].src}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={playNextSong}
      />

      <div
        ref={playerRef}
        className="
          fixed bottom-5 left-5 z-[9999]
          flex items-end gap-3
        "
      >
        {/* Music button + playlist toggle */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            aria-pressed={isPlaying}
            className="
              relative flex h-[44px] w-[44px]
              cursor-pointer items-center justify-center
              rounded-full border-[3px] border-[#C9924D]
              bg-gradient-to-b from-[#FDF2DD] to-[#F1C58C]
              text-[#956323]
              shadow-[0_5px_18px_rgba(99,67,32,0.28)]
              transition-transform duration-300
              hover:scale-105
              sm:h-[76px] sm:w-[76px]
            "
          >
            {isPlaying && (
              <CircularMusicVisualizer
                analyser={analyser}
                isPlaying={isPlaying}
              />
            )}

            <span className="relative z-10 text-[18px] sm:text-[28px]">
              {isPlaying ? <MdMusicNote /> : <MdMusicOff />}
            </span>

            <img
              src={buttonFlower}
              alt=""
              className="
                pointer-events-none absolute
                -bottom-3 -left-4 z-20
                w-[45px] sm:w-[55px]
              "
            />
          </button>

          {/* Small button to open/close playlist */}
          <button
            type="button"
            onClick={() => setIsPanelOpen((prev) => !prev)}
            aria-label={isPanelOpen ? "Close playlist" : "Open playlist"}
            aria-expanded={isPanelOpen}
            className="
              absolute -top-2 -right-2 z-2
              flex w-6 h-6 xl:h-10 xl:w-10 cursor-pointer
              items-center justify-center
              rounded-full border border-[#C9924D]
              bg-[#FFF8EB] text-[#956323]
              shadow-sm transition-transform
              hover:scale-110
            "
          >
            {isPanelOpen ? (
              <MdChevronRight size={17} />
            ) : (
              <MdChevronLeft size={17} />
            )}
          </button>
        </div>
        {/* Song selection panel */}
        <div
          className={`
            origin-right overflow-hidden
            transition-all duration-300 ease-in-out
            ${
              isPanelOpen
                ? "w-[220px] opacity-100 sm:w-[260px]"
                : "w-0 opacity-0"
            }
          `}
        >
          <div
            className="
              rounded-2xl border border-[#C9924D]/60
              bg-[#FFF8EB]/95
              p-3 shadow-[0_8px_30px_rgba(99,67,32,0.18)]
              backdrop-blur-md
            "
          >
            <div className="mb-2 flex items-center justify-between">
              <span
                className="
                  text-xs font-semibold tracking-[0.12em]
                  text-[#956323] uppercase
                "
              >
                Wedding Playlist
              </span>

              <button
                type="button"
                onClick={() => setIsPanelOpen(false)}
                className="cursor-pointer text-[#956323]"
                aria-label="Close playlist"
              >
                <MdChevronLeft size={20} />
              </button>
            </div>

            <div className="max-h-[170px] wedding-scrollbar space-y-1 overflow-y-auto">
              {songs.map((song, index) => (
                <button
                  key={song.id}
                  type="button"
                  onClick={() => selectSong(index)}
                  className={`
                    flex w-full cursor-pointer items-center
                    gap-3 rounded-xl px-3 py-2
                    text-left transition-colors
                    ${
                      selectedSong === index
                        ? "bg-[#F2DFC2]"
                        : "hover:bg-[#F8EBD8]"
                    }
                  `}
                >
                  <span className="text-lg text-[#C9924D]">
                    {selectedSong === index && isPlaying ? (
                      <MdMusicNote />
                    ) : (
                      <MdPlayArrow />
                    )}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className="
                        block truncate text-sm
                        font-medium text-[#76522F]
                      "
                    >
                      {song.title}
                    </span>

                    <span
                      className="
                        block truncate text-xs
                        text-[#A48766]
                      "
                    >
                      {song.artist}
                    </span>
                  </span>

                  {selectedSong === index && isPlaying && (
                    <span className="text-[#C9924D]">
                      <MdPause size={16} />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
