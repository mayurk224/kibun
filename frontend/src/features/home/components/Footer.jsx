import React from "react";
import {
  ChevronFirst,
  ChevronLast,
  Pause,
  Play,
  Repeat,
  Shuffle,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { usePlayer } from "../../../context/PlayerContext";

const Footer = () => {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    volume,
    setVolume,
    togglePlay,
    playNext,
    playPrev,
    seek,
  } = usePlayer();

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - bounds.left) / bounds.width;
    seek(percent * duration);
  };

  const handleVolume = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(
      0,
      Math.min(1, (e.clientX - bounds.left) / bounds.width),
    );
    setVolume(percent);
  };

  return (
    <footer className="bg-[#141414] text-zinc-400 border-t border-white/5">
      <div className="mx-auto px-4 py-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 cursor-default">
          {/* Left: Song Info */}
          <div className="flex items-center justify-start w-full lg:w-[30%] min-w-[180px]">
            <div className="flex items-center gap-3 group">
              <img
                src={
                  currentSong
                    ? currentSong.posterUrl
                    : "https://via.placeholder.com/150"
                }
                alt="poster"
                className="h-14 w-14 rounded bg-[#2a2a2a] object-cover shadow-sm"
              />
              <div className="flex flex-col overflow-hidden">
                <h3 className="text-sm font-medium text-zinc-100 tracking-wide hover:underline cursor-pointer truncate">
                  {currentSong ? currentSong.title : "No Song Selected"}
                </h3>
                <p className="text-xs text-zinc-400 hover:text-zinc-100 hover:underline cursor-pointer truncate mt-0.5">
                  {currentSong
                    ? currentSong.artist ||
                      currentSong.uploadedBy?.username ||
                      "Unknown"
                    : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Center: Playback Controls & Progress */}
          <div className="flex flex-col items-center justify-center w-full lg:w-[40%] max-w-2xl gap-2">
            <div className="flex items-center gap-6">
              <button className="text-zinc-400 hover:text-white transition-colors duration-200">
                <Shuffle size={18} />
              </button>
              <button
                onClick={playPrev}
                className="text-zinc-400 hover:text-white transition-colors duration-200"
              >
                <ChevronFirst size={24} />
              </button>
              <button
                onClick={togglePlay}
                className="text-black bg-white hover:scale-105 transition-all duration-200 rounded-full p-2 flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause size={20} fill="currentColor" />
                ) : (
                  <Play size={20} fill="currentColor" />
                )}
              </button>
              <button
                onClick={playNext}
                className="text-zinc-400 hover:text-white transition-colors duration-200"
              >
                <ChevronLast size={24} />
              </button>
              <button className="text-zinc-400 hover:text-white transition-colors duration-200">
                <Repeat size={18} />
              </button>
            </div>

            <div className="w-full flex items-center gap-2 text-xs font-medium">
              <span className="text-zinc-400 w-10 text-right">
                {formatTime(progress)}
              </span>
              <div
                className="h-1 flex-1 bg-zinc-800 rounded-full overflow-hidden cursor-pointer group flex items-center"
                onClick={handleSeek}
              >
                <div
                  className="bg-zinc-300 group-hover:bg-white h-full rounded-full relative transition-colors"
                  style={{
                    width: `${duration && duration > 0 ? (progress / duration) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <span className="text-zinc-400 w-10">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right: Extra Controls */}
          <div className="flex items-center justify-end w-full lg:w-[30%] gap-3">
            <button
              onClick={() => setVolume(volume === 0 ? 1 : 0)}
              className="text-zinc-400 hover:text-white transition-colors duration-200"
            >
              {volume === 0 ? (
                <VolumeX size={20} />
              ) : volume < 0.5 ? (
                <Volume1 size={20} />
              ) : (
                <Volume2 size={20} />
              )}
            </button>
            <div
              className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden cursor-pointer group hidden sm:flex items-center"
              onClick={handleVolume}
            >
              <div
                className="bg-zinc-300 group-hover:bg-white h-full rounded-full relative transition-colors"
                style={{ width: `${volume * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
