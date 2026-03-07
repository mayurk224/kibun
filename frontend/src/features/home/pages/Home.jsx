import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useHome } from "../hooks/useHome";
import { usePlayer } from "../../../context/PlayerContext";
import { useLyrics } from "../../../hooks/useLyrics";
import Navbar from "../components/Navbar";
import FaceExpression from "../../faceDetect/components/FaceExpression";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Category from "../components/Category";

const Home = () => {
  const { user, handleLogout, isLoading: isAuthLoading, errors } = useAuth();
  const { musicList, isFetchingMusic, handleGetAllMusic } = useHome();
  const { currentSong, progress } = usePlayer();
  const {
    lyrics,
    activeLine,
    loading: lyricsLoading,
    error: lyricsError,
  } = useLyrics(currentSong?.lyricUrl, progress);

  const [activeCategory, setActiveCategory] = useState("all");
  const lyricsContainerRef = useRef(null);
  const activeLineRef = useRef(null);

  useEffect(() => {
    handleGetAllMusic();
  }, [handleGetAllMusic]);

  useEffect(() => {
    if (activeLineRef.current && lyricsContainerRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeLine]);

  const isLoading = isAuthLoading || isFetchingMusic;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-[#1f1f1f] text-white">
      {/* 1. Navbar stays pinned to the top */}
      <div className="shrink-0">
        <Navbar user={user} handleLogout={handleLogout} />
      </div>

      {/* 2. Flex-1 takes up all remaining vertical space under the Navbar */}
      <div className="flex flex-1 overflow-hidden">
        {/* 3. Sidebar gets exactly 25% width and doesn't shrink */}
        <div className="w-1/4 min-w-[280px] max-w-[350px] h-full shrink-0">
          <Sidebar
            musicList={
              activeCategory === "all"
                ? musicList
                : musicList.filter(
                    (m) =>
                      m.mood?.toLowerCase() === activeCategory.toLowerCase(),
                  )
            }
          />
        </div>

        {/* 4. Main content wrapper takes remaining 75% and handles vertical scrolling */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto">
          {/* flex-1 pushes the footer to the bottom even if content is short */}
          <main className="flex-1 p-6">
            {/* Used gap-6 instead of manual widths for better responsive behavior */}
            <section className="flex flex-col md:flex-row items-center justify-between w-full mb-5 gap-6 h-[249px]">
              <div
                className="flex-1 bg-cover bg-center h-full p-5 rounded-2xl relative shadow-lg"
                style={{
                  // Added a gradient overlay directly to the style to ensure text is always readable
                  backgroundImage: currentSong?.posterUrl
                    ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(15, 15, 15, 0.9) 100%), url('${currentSong.posterUrl}')`
                    : "linear-gradient(to bottom, #1f2937, #111827)",
                }}
              >
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-300 drop-shadow-md">
                  Now Playing
                </p>
                {/* Added text-white, line-clamp, and drop-shadow for better legibility */}
                <h1 className="text-lg font-bold mt-1 text-white drop-shadow-lg line-clamp-1">
                  {currentSong
                    ? `${currentSong.title} - ${currentSong.artist}`
                    : "No song selected"}
                </h1>

                <div
                  ref={lyricsContainerRef}
                  className="lyrics h-[100px] flex flex-col overflow-y-auto pr-2 custom-scrollbar mt-10"
                  style={{
                    // Smoothly fades the lyrics at the top and bottom of the container
                    maskImage:
                      "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                  }}
                >
                  {lyricsLoading && (
                    <p className="text-gray-400 mt-auto mb-auto text-center animate-pulse">
                      Loading lyrics...
                    </p>
                  )}
                  {lyricsError && (
                    <p className="text-red-400 mt-auto mb-auto text-center">
                      {lyricsError}
                    </p>
                  )}
                  {!lyricsLoading && !lyricsError && lyrics.length === 0 && (
                    <p className="text-gray-400 mt-auto mb-auto text-center italic">
                      No lyrics available
                    </p>
                  )}
                  {!lyricsLoading &&
                    !lyricsError &&
                    lyrics.map((line, index) => {
                      const isActive = index === activeLine;
                      return (
                        <h2
                          key={index}
                          ref={isActive ? activeLineRef : null}
                          // Enhanced the active state transition with slight scaling and opacity changes
                          className={`transition-all duration-300 mt-2 ${
                            isActive
                              ? "text-2xl font-bold text-white active drop-shadow-md scale-100 opacity-100"
                              : "text-xl font-medium text-gray-400 scale-95 opacity-50 hover:opacity-75 cursor-default"
                          }`}
                        >
                          {line.text}
                        </h2>
                      );
                    })}
                </div>
              </div>

              <div className="flex justify-center md:justify-end h-full">
                <FaceExpression />
              </div>
            </section>

            <section>
              <Category
                musicList={musicList}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                filteredMusicList={
                  activeCategory === "all"
                    ? musicList
                    : musicList.filter(
                        (m) =>
                          m.mood?.toLowerCase() ===
                          activeCategory.toLowerCase(),
                      )
                }
              />
            </section>
          </main>

          {/* 5. Footer stays at the bottom of the scrolling content */}
          <div className="shrink-0 mt-auto">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
