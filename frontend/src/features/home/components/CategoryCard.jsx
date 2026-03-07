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
<<<<<<< HEAD
      className={`group flex items-center gap-3 p-2 rounded-[4px] transition-all duration-200 cursor-pointer focus-within:bg-[--bg-surface] focus-within:outline-none border border-transparent ${
        active
          ? "bg-[--bg-surface] border-[--btn-primary-bg] shadow-[0_0_4px_var(--btn-primary-bg)]"
          : "hover:bg-[--bg-surface] border-transparent hover:border-[--border-subtle]"
=======
      className={`group flex items-center gap-3 p-2 rounded-md transition-colors duration-200 cursor-pointer focus-within:bg-white/5 focus-within:outline-none ${
        active ? "bg-white/10" : "hover:bg-white/5"
>>>>>>> parent of 37893cd (feat: Initialize frontend application with core UI components, home page, and face expression detection.)
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
<<<<<<< HEAD
      <div className="relative h-10 w-10 shrink-0 bg-[--bg-surface] rounded-[2px] overflow-hidden">
=======
      <div className="relative h-10 w-10 shrink-0 bg-[#2a2a2a] rounded overflow-hidden">
>>>>>>> parent of 37893cd (feat: Initialize frontend application with core UI components, home page, and face expression detection.)
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${title} cover`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
<<<<<<< HEAD
          <div className="w-full h-full flex items-center justify-center bg-[--bg-surface] text-[--text-muted]">
            <Music className="w-5 h-5" />
=======
          <div className="w-full h-full flex items-center justify-center bg-[#2a2a2a] text-zinc-600">
            <Music />
>>>>>>> parent of 37893cd (feat: Initialize frontend application with core UI components, home page, and face expression detection.)
          </div>
        )}

        {/* Minimal Play Overlay: Stark white icon on a simple black tint, no bouncing colored circles */}
<<<<<<< HEAD
        <div className="absolute inset-0 bg-[--bg-app]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Play
            className="w-4 h-4 text-[--text-high-emphasis] ml-0.5"
            fill="currentColor"
          />
=======
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
>>>>>>> parent of 37893cd (feat: Initialize frontend application with core UI components, home page, and face expression detection.)
        </div>
      </div>

      {/* Text Content: Flatter typography hierarchy */}
      <div className="flex-1 min-w-0">
<<<<<<< HEAD
        <h3 className="text-sm font-medium text-[--text-high-emphasis] truncate transition-colors duration-200">
          {title}
        </h3>
        <p className="text-xs text-[--text-muted] truncate mt-0.5">
          {artist}
        </p>
=======
        <h3 className="text-sm font-medium text-zinc-200 truncate group-hover:text-white transition-colors duration-200">
          {title}
        </h3>
        <p className="text-xs text-zinc-500 truncate mt-0.5">{artist}</p>
>>>>>>> parent of 37893cd (feat: Initialize frontend application with core UI components, home page, and face expression detection.)
      </div>
    </div>
  );
};

export default CategoryCard;
