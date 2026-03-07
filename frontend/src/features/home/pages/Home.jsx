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
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const {
    user,
    handleLogout: authLogout,
    isLoading: isAuthLoading,
    errors,
  } = useAuth();
  const { musicList, isFetchingMusic, handleGetAllMusic } = useHome();
  const { currentSong, progress, resetPlayer } = usePlayer();
  const {
    lyrics,
    activeLine,
    loading: lyricsLoading,
    error: lyricsError,
  } = useLyrics(currentSong?.lyricUrl, progress);

  const [activeCategory, setActiveCategory] = useState(() => {
    const saved = localStorage.getItem("activeCategory");
    return saved || "all";
  });

  useEffect(() => {
    localStorage.setItem("activeCategory", activeCategory);
  }, [activeCategory]);

  const handleComprehensiveLogout = async () => {
    // 1. Revoke Camera Access
    document.querySelectorAll("video").forEach((video) => {
      if (video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        video.srcObject = null;
      }
    });

    // 2. Stop Audio Playback
    if (resetPlayer) {
      resetPlayer();
    }

    // 3. Clear Intervals/Timeouts
    const highestId = window.setTimeout(() => {}, 0);
    for (let i = 0; i <= highestId; i++) {
      window.clearTimeout(i);
      window.clearInterval(i);
    }

    // 4. Clear Session Data
    localStorage.clear();
    sessionStorage.clear();

    // 5. Reset Global State
    setActiveCategory("all");
    await authLogout();

    // 6. Redirect
    navigate("/login", { replace: true });
  };
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
      <div className="min-h-screen bg-[var(--bg-app)] flex items-center justify-center">
        <div className="text-center flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[var(--color-gardens)] border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_15px_var(--color-gardens)]"></div>
          <p className="text-[var(--text-high-emphasis)] text-lg font-medium tracking-wide">
            Loading Kibun...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-[var(--bg-app)] text-[var(--text-high-emphasis)]">
      {/* 1. Navbar stays pinned to the top */}
      <div className="shrink-0 relative z-50">
        <Navbar user={user} handleLogout={handleComprehensiveLogout} />
      </div>

      {/* 2. Flex-1 takes up all remaining vertical space under the Navbar */}
      <div className="flex flex-1 overflow-hidden relative z-0">
        {/* 3. Sidebar gets exactly 25% width and doesn't shrink */}
        <div className="w-1/4 min-w-[280px] max-w-[350px] h-full shrink-0 border-r border-[var(--border-subtle)] bg-[var(--bg-surface)] backdrop-blur-md z-10">
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
                              ? "text-2xl font-bold text-[var(--color-gardens)] active drop-shadow-md scale-100 opacity-100"
                              : "text-xl font-medium text-gray-400 scale-95 opacity-50 hover:opacity-75 cursor-default"
                          }`}
                        >
                          {line.text}
                        </h2>
                      );
                    })}
                </div>
              </div>

              <div className="flex justify-center xl:justify-end h-full w-full xl:w-auto shrink-0">
                <FaceExpression onExpressionDetect={setActiveCategory} />
              </div>
            </section>

            <section className="relative z-10">
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
          <div className="shrink-0 mt-auto sticky bottom-0 z-40 bg-[var(--bg-surface)] backdrop-blur-xl border-t border-[var(--border-subtle)] shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.5)]">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
