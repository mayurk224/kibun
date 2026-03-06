import React from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import Navbar from "../components/Navbar";
import FaceExpression from "../../faceDetect/components/FaceExpression";
import {
  ChevronFirst,
  ChevronLast,
  Pause,
  Play,
  Repeat,
  Shuffle,
  Volume,
  Volume1,
  Volume2,
  VolumeOff,
  VolumeX,
} from "lucide-react";

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
          <div className="w-full">
            {/* song card with image, title, artist, play button, song duration */}
            <div className="songCard flex w-full">
              <div className="flex items-center w-full">
                <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold">Song Title</h3>
                    <p className="text-gray-600">Artist Name</p>
                  </div>
                  <div className="">
                    <p className="text-gray-600">3:45</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div className="">
          <main>
            <section className="flex items-center justify-center w-full">
              <div className="w-1/2">
                <p>now playing</p>
                <h2>Title</h2>
                <h1>Song lyrics</h1>
              </div>
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
                  <div className="topSongCard">
                    <div className="h-20 w-20 bg-gray-200 rounded-lg">
                      <img src="" alt="" />
                    </div>
                    <div className="">
                      <h3 className="text-lg font-bold">Song Title</h3>
                      <p className="text-gray-600">Artist Name</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <footer>
            {/* previous button, play pause button, next button , volume control, song title, artist, song image , progress bar , shuffle button, repeat button*/}
            footer
            <div className="flex items-center">
              <div className="flex items-center">
                <img
                  src=""
                  alt=""
                  className="h-20 w-20 rounded-lg bg-gray-200"
                />
                <div className="">
                  <h3 className="text-lg font-bold">Song Title</h3>
                  <p className="text-gray-600">Artist Name</p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <button>
                    <ChevronFirst />
                  </button>
                  <button>
                    <Pause />
                  </button>
                  <button>
                    <Play />
                  </button>
                  <button>
                    <ChevronLast />
                  </button>
                </div>
                <div className="">
                  {/* progress bar */}
                  {/* song duration */}
                </div>
                <div className="flex items-center">
                  <button>
                    <Shuffle />
                  </button>
                  <button>
                    <Repeat />
                  </button>
                  <div className="flex items-center">
                    <button>
                      <Volume />
                    </button>
                    <button>
                      <Volume1 />
                    </button>
                    <button>
                      <Volume2 />
                    </button>
                    <button>
                      <VolumeOff />
                    </button>
                    <button>
                      <VolumeX />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
