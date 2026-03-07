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
    <footer className="bg-[var(--bg-app)] backdrop-blur-xl text-[var(--text-muted)] border-t-0.5 border-[var(--border-subtle)] z-50 relative">
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
                className="h-14 w-14 rounded bg-[var(--bg-app)] border border-[var(--border-subtle)] object-cover shadow-sm"
              />
              <div className="flex flex-col overflow-hidden">
                <h3 className="text-sm font-semibold text-[var(--text-high-emphasis)] tracking-wide hover:text-[var(--color-gardens)] cursor-pointer truncate transition-colors">
                  {currentSong ? currentSong.title : "No Song Selected"}
                </h3>
                <p className="text-xs text-[var(--text-muted)] hover:text-[var(--text-high-emphasis)] cursor-pointer truncate mt-0.5 transition-colors">
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
              <button className="text-[var(--text-muted)] hover:text-[var(--text-high-emphasis)] transition-colors duration-200 focus:outline-none">
                <Shuffle size={18} />
              </button>
              <button
                onClick={playPrev}
                className="text-[var(--text-muted)] hover:text-[var(--text-high-emphasis)] transition-colors duration-200 focus:outline-none"
              >
                <ChevronFirst size={24} />
              </button>
              <button
                onClick={togglePlay}
                className="text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-hover)] active:scale-95 transition-all duration-200 rounded-full p-2.5 flex items-center justify-center shadow-[0_0_15px_rgba(193,228,92,0.3)] hover:shadow-[0_0_20px_rgba(193,228,92,0.5)] focus:outline-none"
              >
                {isPlaying ? (
                  <Pause size={20} fill="currentColor" />
                ) : (
                  <Play size={20} fill="currentColor" />
                )}
              </button>
              <button
                onClick={playNext}
                className="text-[var(--text-muted)] hover:text-[var(--text-high-emphasis)] transition-colors duration-200 focus:outline-none"
              >
                <ChevronLast size={24} />
              </button>
              <button className="text-[var(--text-muted)] hover:text-[var(--text-high-emphasis)] transition-colors duration-200 focus:outline-none">
                <Repeat size={18} />
              </button>
            </div>

            <div className="w-full flex items-center gap-3 text-xs font-medium">
              <span className="text-[var(--text-muted)] w-10 text-right">
                {formatTime(progress)}
              </span>
              <div
                className="h-1.5 flex-1 bg-[rgba(11,17,34,0.5)] border border-[var(--border-subtle)] rounded-full overflow-hidden cursor-pointer group flex items-center"
                onClick={handleSeek}
              >
                <div
                  className="bg-[var(--text-high-emphasis)] group-hover:bg-[var(--color-gardens)] h-full rounded-full relative transition-colors shadow-[0_0_8px_rgba(241,241,241,0.5)] group-hover:shadow-[0_0_10px_var(--color-gardens)]"
                  style={{
                    width: `${duration && duration > 0 ? (progress / duration) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <span className="text-[var(--text-muted)] w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Right: Extra Controls */}
          <div className="flex items-center justify-end w-full lg:w-[30%] gap-3">
            <button
              onClick={() => setVolume(volume === 0 ? 1 : 0)}
              className="text-[var(--text-muted)] hover:text-[var(--text-high-emphasis)] transition-colors duration-200 focus:outline-none"
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
              className="w-24 h-1.5 bg-[rgba(11,17,34,0.5)] border border-[var(--border-subtle)] rounded-full overflow-hidden cursor-pointer group flex items-center"
              onClick={handleVolume}
            >
              <div
                className="bg-[var(--text-high-emphasis)] group-hover:bg-[var(--color-gardens)] h-full rounded-full relative transition-colors shadow-[0_0_8px_rgba(241,241,241,0.5)] group-hover:shadow-[0_0_10px_var(--color-gardens)]"
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
