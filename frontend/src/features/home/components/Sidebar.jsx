import React from "react";
import SidebarCard from "./SidebarCard";
import { usePlayer } from "../../../context/PlayerContext";

const Sidebar = ({ musicList = [] }) => {
  const { currentSong, isPlaying, playSong } = usePlayer();

  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <aside className="flex flex-col h-full w-full p-4 bg-[--bg-app] border-r border-[--border-subtle]">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-[--text-high-emphasis] mb-2">
          Playlist
        </h2>
        <p className="text-sm text-[--text-muted] leading-relaxed">
          Your category playlist will be displayed here.
        </p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-2 w-full overflow-y-auto pr-2 pb-6 custom-scrollbar">
        {musicList.length > 0 ? (
          musicList.map((music) => (
            <SidebarCard
              key={music._id}
              active={currentSong?._id === music._id}
              isPlaying={isPlaying}
              title={music.title}
              artist={music.artist || music.uploadedBy?.username || "Unknown"}
              duration={formatDuration(music.duration)}
              imageUrl={music.posterUrl}
              onClick={() => playSong(music, musicList)}
            />
          ))
        ) : (
          /* Enhanced Empty State - Softly centered with better typography */
          <div className="flex flex-col items-center justify-center h-full py-12 text-center opacity-80 select-none">
            <p className="text-sm font-medium text-[--text-high-emphasis]">
              It's quiet in here
            </p>
            <p className="text-xs text-[--text-muted] mt-1">
              No songs found in this playlist.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
