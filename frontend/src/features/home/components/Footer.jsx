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
<<<<<<< HEAD
    <footer className="bg-[--bg-surface] text-[--text-muted] border-t border-[--border-subtle] font-[--font-family-base]">
=======
    <footer className="bg-[#141414] text-zinc-400 border-t border-white/5">
>>>>>>> parent of 37893cd (feat: Initialize frontend application with core UI components, home page, and face expression detection.)
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
<<<<<<< HEAD
                className="h-14 w-14 rounded-[2px] bg-[--bg-surface] object-cover shadow-none border border-[--border-subtle]"
              />
              <div className="flex flex-col overflow-hidden">
                <h3 className="text-sm font-medium text-[--text-high-emphasis] tracking-wide hover:underline cursor-pointer truncate">
                  {currentSong ? currentSong.title : "No Song Selected"}
                </h3>
                <p className="text-xs text-[--text-muted] hover:text-[--text-high-emphasis] hover:underline cursor-pointer truncate mt-0.5">
=======
                className="h-14 w-14 rounded bg-[#2a2a2a] object-cover shadow-sm"
              />
              <div className="flex flex-col overflow-hidden">
                <h3 className="text-sm font-medium text-zinc-100 tracking-wide hover:underline cursor-pointer truncate">
                  {currentSong ? currentSong.title : "No Song Selected"}
                </h3>
                <p className="text-xs text-zinc-400 hover:text-zinc-100 hover:underline cursor-pointer truncate mt-0.5">
>>>>>>> parent of 37893cd (feat: Initialize frontend application with core UI components, home page, and face expression detection.)
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
<<<<<<< HEAD
              <button className="text-[--text-muted] hover:text-[--btn-primary-bg] transition-colors duration-200">
=======
              <button className="text-zinc-400 hover:text-white transition-colors duration-200">
>>>>>>> parent of 37893cd (feat: Initialize frontend application with core UI components, home page, and face expression detection.)
                <Shuffle size={18} />
              </button>
              <button
                onClick={playPrev}
<<<<<<< HEAD
                className="text-[--text-muted] hover:text-[--btn-primary-bg] transition-colors duration-200"
=======
                className="text-zinc-400 hover:text-white transition-colors duration-200"
>>>>>>> parent of 37893cd (feat: Initialize frontend application with core UI components, home page, and face expression detection.)
              >
                <ChevronFirst size={24} />
              </button>
              <button
                onClick={togglePlay}
<<<<<<< HEAD
                className="text-[--btn-primary-text] bg-[--btn-primary-bg] hover:bg-[--btn-primary-hover] transition-all duration-200 rounded-[4px] p-2 flex items-center justify-center shadow-md scale-100 active:scale-95"
=======
                className="text-black bg-white hover:scale-105 transition-all duration-200 rounded-full p-2 flex items-center justify-center"
>>>>>>> parent of 37893cd (feat: Initialize frontend application with core UI components, home page, and face expression detection.)
              >
                {isPlaying ? (
                  <Pause size={20} fill="currentColor" />
                ) : (
                  <Play size={20} fill="currentColor" />
                )}
              </button>
              <button
                onClick={playNext}
<<<<<<< HEAD
                className="text-[--text-muted] hover:text-[--btn-primary-bg] transition-colors duration-200"
              >
                <ChevronLast size={24} />
              </button>
              <button className="text-[--text-muted] hover:text-[--btn-primary-bg] transition-colors duration-200">
=======
                className="text-zinc-400 hover:text-white transition-colors duration-200"
              >
                <ChevronLast size={24} />
              </button>
              <button className="text-zinc-400 hover:text-white transition-colors duration-200">
>>>>>>> parent of 37893cd (feat: Initialize frontend application with core UI components, home page, and face expression detection.)
                <Repeat size={18} />
              </button>
            </div>

            <div className="w-full flex items-center gap-2 text-xs font-medium">
<<<<<<< HEAD
              <span className="text-[--text-muted] w-10 text-right">
                {formatTime(progress)}
              </span>
              <div
                className="h-1 flex-1 bg-[--bg-app] rounded-[2px] overflow-hidden cursor-pointer group flex items-center shadow-none"
                onClick={handleSeek}
              >
                <div
                  className="bg-[--btn-primary-bg] group-hover:bg-[--btn-primary-hover] h-full rounded-[2px] relative transition-colors"
=======
              <span className="text-zinc-400 w-10 text-right">
                {formatTime(progress)}
              </span>
              <div
                className="h-1 flex-1 bg-zinc-800 rounded-full overflow-hidden cursor-pointer group flex items-center"
                onClick={handleSeek}
              >
                <div
                  className="bg-zinc-300 group-hover:bg-white h-full rounded-full relative transition-colors"
>>>>>>> parent of 37893cd (feat: Initialize frontend application with core UI components, home page, and face expression detection.)
                  style={{
                    width: `${duration && duration > 0 ? (progress / duration) * 100 : 0}%`,
                  }}
                ></div>
              </div>
<<<<<<< HEAD
              <span className="text-[--text-muted] w-10">
                {formatTime(duration)}
              </span>
=======
              <span className="text-zinc-400 w-10">{formatTime(duration)}</span>
>>>>>>> parent of 37893cd (feat: Initialize frontend application with core UI components, home page, and face expression detection.)
            </div>
          </div>

          {/* Right: Extra Controls */}
          <div className="flex items-center justify-end w-full lg:w-[30%] gap-3">
            <button
              onClick={() => setVolume(volume === 0 ? 1 : 0)}
<<<<<<< HEAD
              className="text-[--text-muted] hover:text-[--text-high-emphasis] transition-colors duration-200"
=======
              className="text-zinc-400 hover:text-white transition-colors duration-200"
>>>>>>> parent of 37893cd (feat: Initialize frontend application with core UI components, home page, and face expression detection.)
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
<<<<<<< HEAD
              className="w-24 h-1 bg-[--bg-app] rounded-[2px] overflow-hidden cursor-pointer group hidden sm:flex items-center shadow-none border border-[--border-subtle]"
              onClick={handleVolume}
            >
              <div
                className="bg-[--btn-primary-bg] group-hover:bg-[--btn-primary-hover] h-full rounded-[2px] relative transition-colors"
=======
              className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden cursor-pointer group hidden sm:flex items-center"
              onClick={handleVolume}
            >
              <div
                className="bg-zinc-300 group-hover:bg-white h-full rounded-full relative transition-colors"
>>>>>>> parent of 37893cd (feat: Initialize frontend application with core UI components, home page, and face expression detection.)
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
