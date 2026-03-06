import React, { useState } from "react";
import CategoryCard from "./CategoryCard";

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
  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return musicList.length;
    return musicList.filter((m) => m.mood?.toLowerCase() === categoryId).length;
  };

  return (
    <div className="w-full flex flex-col gap-10 py-6">
      {/* Category Selection Area */}
      <div className="flex flex-col gap-4">
        {/* Softened header: smaller, uppercase, heavily tracked for an editorial feel */}
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
          Select Category
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
              group flex items-center justify-center gap-2 px-4 py-2 rounded-full 
              text-sm font-medium transition-colors duration-200 focus:outline-none
              ${
                isActive
                  ? "bg-white text-black" // Stark, high-contrast active state
                  : "bg-transparent text-zinc-400 hover:bg-white/10 hover:text-white" // Subtle inactive state
              }
            `}
                aria-pressed={isActive}
              >
                <span>{cat.emoji}</span>
                <span className="capitalize">{cat.label}</span>

                {/* The count badge scales down in visual weight */}
                <span
                  className={`flex items-center justify-center text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 transition-colors duration-200
                ${
                  isActive
                    ? "bg-zinc-200 text-black" // Blends into the white pill
                    : "bg-zinc-800 text-zinc-500 group-hover:bg-zinc-700 group-hover:text-zinc-300"
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
        {/* Removed the colored badge background, relying on typography for emphasis */}
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium text-zinc-400 tracking-tight">
            Top 5 songs in{" "}
            <span className="capitalize text-white font-semibold">
              {activeCategory}
            </span>
          </h4>
        </div>

        {/* Responsive Grid for Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {filteredMusicList.slice(0, 5).map((item) => (
            <CategoryCard
              key={item._id}
              title={item.title}
              artist={item.artist}
              imageUrl={item.posterUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
