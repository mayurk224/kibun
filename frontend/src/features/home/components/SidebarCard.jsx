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
      className={`group relative flex items-center w-full p-3 rounded-[4px] transition-all duration-200 cursor-pointer overflow-hidden ${
        active
          ? "bg-(--bg-surface) shadow-sm border border-(--btn-primary-bg)"
          : "bg-transparent border border-transparent hover:bg-(--bg-surface) hover:border-(--border-subtle)"
      }`}
    >
      {/* Active Indicator Bar (micro-interaction) */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-(--btn-primary-bg) rounded-r-[2px] transition-all duration-300 ${
          active ? "opacity-100" : "opacity-0 -translate-x-full"
        }`}
      ></div>

      <div className="flex items-center gap-4 w-full ml-1">
        {/* Image Placeholder with Hover Play Icon */}
        <div className="relative h-12 w-12 shrink-0 bg-(--bg-surface) rounded-[2px] overflow-hidden transition-transform duration-300 group-hover:scale-105 group-active:scale-95 shadow-none">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
          <div
            className={`absolute inset-0 bg-(--bg-app)/60 flex items-center justify-center transition-opacity duration-200 ${
              active && isPlaying
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {active && isPlaying ? (
              // Pause Icon for playing state
              <Pause className="w-5 h-5 text-(--text-high-emphasis) drop-shadow-none" />
            ) : (
              // Play Icon
              <Play className="w-5 h-5 text-(--btn-primary-bg) translate-x-px drop-shadow-none" />
            )}
          </div>
        </div>

        {/* Text Info */}
        <div className="flex flex-col grow min-w-0 justify-center">
          <h3
            className={`text-base font-semibold tracking-tight truncate transition-colors duration-200 ${
              active
                ? "text-(--text-high-emphasis)"
                : "text-(--text-high-emphasis) group-hover:text-(--btn-primary-bg)"
            }`}
          >
            {title}
          </h3>
          <p className="text-sm text-(--text-muted) truncate mt-0.5 font-medium transition-colors duration-200 group-hover:text-(--text-high-emphasis)">
            {artist}
          </p>
        </div>

        {/* Duration */}
        <div className="shrink-0 text-right mr-1">
          <p
            className={`text-sm font-medium transition-colors duration-200 ${
              active
                ? "text-(--btn-primary-bg)"
                : "text-(--text-muted) group-hover:text-(--text-high-emphasis)"
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
