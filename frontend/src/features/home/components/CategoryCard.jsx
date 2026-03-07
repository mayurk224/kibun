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
      className={`group flex items-center gap-4 p-3 rounded-xl transition-all duration-300 cursor-pointer focus-within:bg-[rgba(241,241,241,0.05)] focus-within:outline-none border ${
        active
          ? "bg-[rgba(241,241,241,0.05)] border-[var(--border-accent)] shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
          : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:bg-[rgba(241,241,241,0.03)] hover:border-[var(--color-day)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.1)]"
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
      <div className="relative h-14 w-14 shrink-0 bg-[var(--bg-app)] rounded-lg overflow-hidden border border-[var(--border-subtle)] shadow-inner">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${title} cover`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[var(--bg-app)] text-[var(--text-muted)]">
            <Music size={20} />
          </div>
        )}

        <div
          className={`absolute inset-0 bg-[rgba(11,17,34,0.6)] backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        >
          <Play
            className={`w-6 h-6 ml-1 transition-transform duration-300 ${active ? "text-[var(--color-gardens)] drop-shadow-[0_0_8px_var(--color-gardens)] scale-110" : "text-[var(--text-high-emphasis)] group-hover:scale-110"}`}
            fill="currentColor"
          />
        </div>
      </div>

      <div className="flex-1 min-w-0 pr-2">
        <h3
          className={`text-base font-bold truncate transition-colors duration-200 tracking-tight ${active ? "text-[var(--color-gardens)]" : "text-[var(--text-high-emphasis)] group-hover:text-white"}`}
        >
          {title}
        </h3>
        <p className="text-sm text-[var(--text-muted)] truncate mt-0.5 font-medium transition-colors group-hover:text-[var(--text-high-emphasis)]">
          {artist}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
