import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import { usePlayer } from "../../../context/PlayerContext";

const categories = [
  { id: "all", label: "All", count: 5, emoji: "🎵" },
  { id: "happy", label: "Happy", count: 5, emoji: "😊" },
  { id: "sad", label: "Sad", count: 5, emoji: "😢" },
  { id: "surprise", label: "Surprise", count: 5, emoji: "😮" },
  { id: "neutral", label: "Neutral", count: 5, emoji: "😐" },
];

const Category = ({
  musicList = [],
  activeCategory,
  setActiveCategory,
  filteredMusicList = [],
}) => {
  const { currentSong, playSong } = usePlayer();
  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return musicList.length;
    return musicList.filter((m) => m.mood?.toLowerCase() === categoryId).length;
  };

  return (
    <div className="w-full flex flex-col gap-10 py-6">
      {/* Category Selection Area */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest font-[var(--font-family-base)]">
          Select Category
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                // Added active:scale-95 for tactile feedback and focus-visible for accessibility
                className={`
              group flex items-center justify-center gap-2 px-4 py-2 rounded-[4px] 
              text-sm font-medium transition-all duration-200 font-[var(--font-family-base)]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--btn-primary-bg)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-app)]
              active:scale-95
              ${
                isActive
                  ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-md"
                  : "bg-transparent text-[var(--text-muted)] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-high-emphasis)] hover:border-[var(--btn-primary-bg)]"
              }
            `}
                aria-pressed={isActive}
              >
                <span>{cat.emoji}</span>
                <span className="capitalize">{cat.label}</span>

                <span
                  className={`flex items-center justify-center text-[10px] font-bold px-2 py-0.5 rounded-[2px] ml-1 transition-colors duration-200
                ${
                  isActive
                    ? "bg-[var(--bg-app)] text-[var(--text-high-emphasis)]"
                    : "bg-[var(--bg-app)] text-[var(--text-muted)] group-hover:bg-[var(--bg-app)] group-hover:text-[var(--text-high-emphasis)]"
                }
              `}
                >
                  {getCategoryCount(cat.id)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Songs Area */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium text-[var(--text-muted)] tracking-tight">
            {/* Dynamic heading based on actual array length */}
            {filteredMusicList.length >= 5
              ? "Top 5 songs in "
              : "Top songs in "}
            <span className="capitalize text-[var(--text-high-emphasis)] font-semibold">
              {activeCategory}
            </span>
          </h4>
        </div>

        {/* Responsive Grid with Empty State Handling */}
        {filteredMusicList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {filteredMusicList.slice(0, 5).map((item) => (
              <CategoryCard
                key={item._id}
                active={currentSong?._id === item._id}
                title={item.title}
                artist={item.artist}
                imageUrl={item.posterUrl}
                onClick={() => playSong(item, filteredMusicList)}
              />
            ))}
          </div>
        ) : (
          /* Graceful fallback if a category has 0 songs */
          <div className="w-full py-12 flex flex-col items-center justify-center rounded-[4px] border border-dashed border-(--border-subtle) bg-(--bg-surface)">
            <p className="text-(--text-muted) text-sm font-(--font-family-base)">
              No songs found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
