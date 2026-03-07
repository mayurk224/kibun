import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import { usePlayer } from "../../../context/PlayerContext";
import { Music } from "lucide-react";

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
    <div className="w-full flex flex-col gap-5 pt-5">
      {/* Category Selection Area */}
      <div className="flex flex-col gap-5">
        <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest pl-1">
          Select Category
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
              group flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full 
              text-sm font-semibold transition-all duration-300 
              focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-app)]
              active:scale-95 border
              ${
                isActive
                  ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-transparent shadow-[0_0_15px_rgba(193,228,92,0.4)]"
                  : "bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:bg-[rgba(241,241,241,0.05)] hover:text-[var(--text-high-emphasis)] hover:border-[var(--color-day)]"
              }
            `}
                aria-pressed={isActive}
              >
                <span className="text-base">{cat.emoji}</span>
                <span className="capitalize tracking-wide">{cat.label}</span>

                <span
                  className={`flex items-center justify-center text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 transition-colors duration-300
                ${
                  isActive
                    ? "bg-[rgba(11,17,34,0.2)] text-[var(--btn-primary-text)]"
                    : "bg-[rgba(11,17,34,0.5)] text-[var(--text-muted)] group-hover:bg-[var(--bg-app)] group-hover:text-[var(--text-high-emphasis)]"
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
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between pl-1">
          <h4 className="text-xl font-semibold text-[var(--text-high-emphasis)] tracking-tight">
            {filteredMusicList.length >= 5
              ? "Top 5 songs in "
              : "Top songs in "}
            <span className="capitalize text-[var(--color-gardens)] font-bold">
              {activeCategory}
            </span>
          </h4>
        </div>

        {/* Responsive Grid with Empty State Handling */}
        {filteredMusicList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
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
          <div className="w-full flex items-center justify-center rounded-3xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 gap-5">
            <div className="w-16 h-16 rounded-full bg-[rgba(241,241,241,0.03)] flex items-center justify-center">
              <span className="text-2xl opacity-50"><Music/></span>
            </div>
            <div className="flex flex-col">
              <p className="text-[var(--text-high-emphasis)] font-medium text-lg">
                Empty Category
              </p>
              <p className="text-[var(--text-muted)] text-sm mt-1">
                No songs found in this mood.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
