import React from "react";
import { Music, Play } from "lucide-react";

const CategoryCard = ({
  title = "Song Title",
  artist = "Artist Name",
  imageUrl = "",
  onClick,
  active,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group flex items-center gap-3 p-2 rounded-md transition-colors duration-200 cursor-pointer focus-within:bg-white/5 focus-within:outline-none ${
        active ? "bg-white/10" : "hover:bg-white/5"
      }`}
      tabIndex={0}
      role="button"
      aria-label={`Play ${title} by ${artist}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (onClick) onClick();
        }
      }}
    >
      {/* Image Container: Removed borders, kept a subtle scale on the image itself */}
      <div className="relative h-10 w-10 shrink-0 bg-[#2a2a2a] rounded overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${title} cover`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#2a2a2a] text-zinc-600">
            <Music />
          </div>
        )}

        {/* Minimal Play Overlay: Stark white icon on a simple black tint, no bouncing colored circles */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
        </div>
      </div>

      {/* Text Content: Flatter typography hierarchy */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-zinc-200 truncate group-hover:text-white transition-colors duration-200">
          {title}
        </h3>
        <p className="text-xs text-zinc-500 truncate mt-0.5">{artist}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
