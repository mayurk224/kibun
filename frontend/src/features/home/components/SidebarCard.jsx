import { Pause, Play } from "lucide-react";
import React from "react";

const SidebarCard = ({
  active,
  isPlaying,
  title = "Song Title",
  artist = "Artist Name",
  duration = "3:45",
  imageUrl = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative shrink-0 flex items-center w-full p-3 rounded-2xl transition-all duration-200 cursor-pointer overflow-hidden ${
        active
          ? "bg-[rgba(241,241,241,0.08)] shadow-sm border border-[var(--border-accent)]"
          : "bg-transparent border border-transparent hover:bg-[rgba(241,241,241,0.04)] hover:border-[var(--border-subtle)]"
      }`}
    >
      {/* Active Indicator Bar (micro-interaction) */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[var(--color-gardens)] rounded-r-md transition-all duration-300 shadow-[0_0_8px_var(--color-gardens)] ${
          active ? "opacity-100" : "opacity-0 -translate-x-full"
        }`}
      ></div>

      <div className="flex items-center gap-4 w-full ml-1">
        {/* Image Placeholder with Hover Play Icon */}
        <div className="relative h-12 w-12 shrink-0 bg-[var(--bg-app)] border border-[var(--border-subtle)] rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-105 group-active:scale-95 shadow-inner">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
          <div
            className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-200 ${
              active && isPlaying
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {active && isPlaying ? (
              // Pause Icon for playing state
              <Pause className="w-5 h-5 text-[var(--text-high-emphasis)] translate-x-px drop-shadow-md" />
            ) : (
              // Play Icon
              <Play className="w-5 h-5 text-[var(--text-high-emphasis)] translate-x-px drop-shadow-md" />
            )}
          </div>
        </div>

        {/* Text Info */}
        <div className="flex flex-col grow min-w-0 justify-center">
          <h3
            className={`text-base font-semibold tracking-tight truncate transition-colors duration-200 ${
              active
                ? "text-[var(--text-high-emphasis)]"
                : "text-[var(--text-high-emphasis)] group-hover:text-[var(--color-gardens)]"
            }`}
          >
            {title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] truncate mt-0.5 font-medium transition-colors duration-200 group-hover:text-[var(--text-high-emphasis)]">
            {artist}
          </p>
        </div>

        {/* Duration */}
        <div className="shrink-0 text-right mr-1">
          <p
            className={`text-sm font-medium transition-colors duration-200 ${
              active
                ? "text-[var(--color-gardens)]"
                : "text-[var(--text-muted)] group-hover:text-[var(--text-high-emphasis)]"
            }`}
          >
            {duration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarCard;
