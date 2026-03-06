import React from "react";
import SidebarCard from "./SidebarCard";

const Sidebar = () => {
  // Mapping SCSS variables from login.scss to inline CSS variables
  const styleVars = {
    "--primary-color": "#6366f1",
    "--primary-hover": "#4f46e5",
    "--background-color": "#2e2e2e",
    "--surface-color": "#1f1f1f",
    "--text-color": "#ffffff",
    "--text-muted": "#a1a1aa",
    "--border-color": "#3f3f46",
  };

  return (
    <aside
      className="flex flex-col h-full min-h-screen p-4 bg-(--background-color)"
      style={styleVars}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-(--text-color) mb-2">
          Playlist
        </h2>
        <p className="text-sm text-(--text-muted) leading-relaxed">
          Your personalized playlist will be displayed here.
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full overflow-y-auto pr-2 pb-6 custom-scrollbar">
        {/* Mocked song cards to showcase styles */}
        <SidebarCard
          active={true}
          title="Midnight City"
          artist="M83"
          duration="4:03"
        />
        <SidebarCard
          active={false}
          title="Blinding Lights"
          artist="The Weeknd"
          duration="3:20"
        />
        <SidebarCard
          active={false}
          title="Levitating"
          artist="Dua Lipa"
          duration="3:23"
        />
        <SidebarCard
          active={false}
          title="Save Your Tears"
          artist="The Weeknd"
          duration="3:35"
        />
      </div>
    </aside>
  );
};

export default Sidebar;
