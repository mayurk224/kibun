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
      className={`group flex items-center gap-3 p-2 rounded-[4px] transition-all duration-200 cursor-pointer focus-within:bg-[var(--bg-surface)] focus-within:outline-none border border-transparent ${
        active
          ? "bg-[var(--bg-surface)] border-[var(--btn-primary-bg)] shadow-[0_0_4px_var(--btn-primary-bg)]"
          : "hover:bg-[var(--bg-surface)] border-transparent hover:border-[var(--border-subtle)]"
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
      <div className="relative h-10 w-10 shrink-0 bg-[var(--bg-surface)] rounded-[2px] overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${title} cover`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[var(--bg-surface)] text-[var(--text-muted)]">
            <Music className="w-5 h-5" />
          </div>
        )}

        {/* Minimal Play Overlay: Stark white icon on a simple black tint, no bouncing colored circles */}
        <div className="absolute inset-0 bg-[var(--bg-app)]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Play
            className="w-4 h-4 text-[var(--text-high-emphasis)] ml-0.5"
            fill="currentColor"
          />
        </div>
      </div>

      {/* Text Content: Flatter typography hierarchy */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-[var(--text-high-emphasis)] truncate transition-colors duration-200">
          {title}
        </h3>
        <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">
          {artist}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
