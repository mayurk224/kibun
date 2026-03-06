import React from "react";
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

const Footer = () => {
  return (
    <footer className="bg-[#141414] text-zinc-400 border-t border-white/5">
      <div className="mx-auto px-6 py-4">
        {/* Main Grid: Shifted to a strict 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center cursor-default">
          {/* Column 1: Song Info + Main Playback Controls */}
          <div className="flex items-center gap-8">
            {/* Song Info */}
            <div className="flex items-center gap-3 group min-w-max">
              <img
                src=""
                alt=""
                className="h-12 w-12 rounded bg-[#2a2a2a] object-cover shadow-sm"
              />
              <div className="flex flex-col">
                <h3 className="text-sm font-medium text-zinc-200 tracking-wide hover:text-white transition-colors cursor-pointer">
                  Song Title
                </h3>
                <p className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer mt-0.5">
                  Artist Name
                </p>
              </div>
            </div>

            {/* Playback Controls (Now integrated into Left Column) */}
            <div className="flex items-center gap-4 border-l border-zinc-800 pl-8">
              <button className="text-zinc-500 hover:text-white transition-colors duration-200">
                <ChevronFirst size={20} />
              </button>
              <button className="text-zinc-200 hover:text-white hover:scale-105 transition-all duration-200">
                <Pause size={24} />
              </button>
              <button className="text-zinc-500 hover:text-white transition-colors duration-200">
                <ChevronLast size={20} />
              </button>
            </div>
          </div>

          {/* Column 2: Progress & Duration (Now has maximum breathing room) */}
          <div className="flex items-center justify-center w-full px-4">
            <div className="w-full max-w-2xl flex items-center gap-3 text-xs font-medium">
              <span className="text-zinc-500 w-8 text-right">0:00</span>
              <div className="h-1 flex-1 bg-zinc-800 rounded-full overflow-hidden cursor-pointer group">
                <div className="bg-zinc-300 group-hover:bg-white w-1/3 h-full rounded-full relative transition-colors"></div>
              </div>
              <span className="text-zinc-500 w-8">3:45</span>
            </div>
          </div>

          {/* Column 3: Extra Controls */}
          <div className="flex items-center justify-end gap-5">
            <button className="text-zinc-500 hover:text-white transition-colors duration-200">
              <Shuffle size={18} />
            </button>
            <button className="text-zinc-500 hover:text-white transition-colors duration-200">
              <Repeat size={18} />
            </button>
            <div className="flex items-center gap-2 ml-2">
              <button className="text-zinc-500 hover:text-white transition-colors duration-200">
                <Volume size={18} />
              </button>
              {/* Minimal volume slider added for context */}
              <div className="w-20 h-1 bg-zinc-800 rounded-full overflow-hidden cursor-pointer group hidden sm:block">
                <div className="bg-zinc-300 group-hover:bg-white w-2/3 h-full rounded-full relative transition-colors"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
