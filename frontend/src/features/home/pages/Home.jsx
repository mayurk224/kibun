import React from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import Navbar from "../components/Navbar";
import FaceExpression from "../../faceDetect/components/FaceExpression";

const Home = () => {
  const { user, handleLogout, isLoading, errors } = useAuth();

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
    <div className="w-full h-screen">
      <Navbar user={user} handleLogout={handleLogout} />
      <div className="flex h-[calc(100vh-64px)]">
        <aside className="w-1/4 h-full">
          <h2 className="text-2xl font-bold">Playlist</h2>
          <p className="text-gray-600">
            Your personalized playlist will be displayed here.
          </p>
          <div className="">
            {/* song card with image, title, artist, play button, song duration */}
            <div className="songCard flex ">
              <div className="flex items-center justify-center">
                <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold">Song Title</h3>
                    <p className="text-gray-600">Artist Name</p>
                  </div>
                  <p className="text-gray-600">3:45</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div className="">
          <main>
            <section className="flex items-center justify-center w-full">
              <div className="w-1/2">{/*  */}</div>
              <div className="w-1/2">
                <FaceExpression />
              </div>
            </section>
            <section>
              <h3>select Category</h3>
              <div className="flex">
                <button>
                  happy <span>5</span>
                </button>
                <button>
                  sad <span>5</span>
                </button>
                <button>
                  surprise <span>5</span>
                </button>
                <button>
                  neutral <span>5</span>
                </button>
              </div>
              <div className="">
                <h4>Top 5 from songs from category</h4>
                <div className="">
                  {/* song card with image, title, artist, play button */}
                </div>
              </div>
            </section>
          </main>
          <footer>
            {/* previous button, play pause button, next button , volume control, song title, artist, song image , progress bar , shuffle button, repeat button*/}
            footer
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
