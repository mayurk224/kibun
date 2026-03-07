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
      className={`group relative flex items-center w-full p-3 rounded-2xl transition-all duration-200 cursor-pointer overflow-hidden ${
        active
          ? "bg-(--surface-color) shadow-sm border border-white/10"
          : "bg-transparent border border-transparent hover:bg-(--surface-color) hover:border-slate-200/5"
      }`}
    >
      {/* Active Indicator Bar (micro-interaction) */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-(--primary-color) rounded-r-md transition-all duration-300 ${
          active ? "opacity-100" : "opacity-0 -translate-x-full"
        }`}
      ></div>

      <div className="flex items-center gap-4 w-full ml-1">
        {/* Image Placeholder with Hover Play Icon */}
        <div className="relative h-12 w-12 shrink-0 bg-(--border-color) rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-105 group-active:scale-95 shadow-inner">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
          <div
            className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200 ${
              active && isPlaying
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {active && isPlaying ? (
              // Pause Icon for playing state
              <svg
                className="w-5 h-5 text-(--primary-color) drop-shadow-md"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              // Play Icon
              <svg
                className="w-5 h-5 text-white translate-x-px drop-shadow-md"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </div>

        {/* Text Info */}
        <div className="flex flex-col grow min-w-0 justify-center">
          <h3
            className={`text-base font-semibold tracking-tight truncate transition-colors duration-200 ${
              active
                ? "text-(--text-color)"
                : "text-(--text-color) group-hover:text-white"
            }`}
          >
            {title}
          </h3>
          <p className="text-sm text-(--text-muted) truncate mt-0.5 font-medium transition-colors duration-200 group-hover:text-gray-400">
            {artist}
          </p>
        </div>

        {/* Duration */}
        <div className="shrink-0 text-right mr-1">
          <p
            className={`text-sm font-medium transition-colors duration-200 ${
              active
                ? "text-(--primary-color)"
                : "text-(--text-muted) group-hover:text-gray-300"
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
