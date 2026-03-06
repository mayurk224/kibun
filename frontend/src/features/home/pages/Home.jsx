import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useHome } from "../hooks/useHome";
import Navbar from "../components/Navbar";
import FaceExpression from "../../faceDetect/components/FaceExpression";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Category from "../components/Category";

const Home = () => {
  const { user, handleLogout, isLoading: isAuthLoading, errors } = useAuth();
  const { musicList, isFetchingMusic, handleGetAllMusic } = useHome();
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    handleGetAllMusic();
  }, [handleGetAllMusic]);

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
        <div className="w-1/4.5 h-full shrink-0">
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
            <section className="flex flex-col md:flex-row items-center justify-between w-full mb-5 gap-6 h-[250px]">
              <div className="flex-1 bg-[url('https://images.pexels.com/photos/6270264/pexels-photo-6270264.jpeg')] bg-cover h-full p-5 rounded-2xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Now Playing
                </p>
                <h1 className="text-lg font-bold mt-1">RIO - NetSky</h1>
                <div className="lyrics h-[160px] flex flex-col justify-center">
                  <h2 className="text-xl font-bold mt-1">
                    Wherever she goes, I go, we roll, we go
                  </h2>
                  <h2 className="text-2xl font-bold mt-1 active">
                    Flying over cities down to Rio, it's real
                  </h2>
                  <h2 className="text-xl font-bold mt-1">
                    Love that I feel, well nothing lasts forever
                  </h2>
                </div>
              </div>
              <div className="flex justify-center md:justify-end h-[250px]">
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
