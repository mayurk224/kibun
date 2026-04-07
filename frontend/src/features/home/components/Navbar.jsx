import React, { useState } from "react";
// import UploadModal from "./UploadModal";
const Navbar = ({ user, handleLogout }) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <nav className="w-full bg-[var(--bg-app)] border-b border-[var(--border-subtle)] px-6 py-3 sticky top-0 z-50 shadow-sm relative">
      <div className=" mx-auto flex items-center justify-between">
        {/* Brand */}

        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="/logo.png"
            alt="Kibun Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-2xl font-bold tracking-tight text-[var(--text-high-emphasis)]">
            Kibun
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* <div className="relative">
            <button
              onClick={() => setIsUploadOpen(!isUploadOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-hover)] text-[var(--btn-primary-text)] text-sm font-semibold rounded-md transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-app)]"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <span className="hidden sm:inline">Upload</span>
            </button>

            <UploadModal
              isOpen={isUploadOpen}
              onClose={() => setIsUploadOpen(false)}
            />
          </div> */}

          <div className="flex items-center pl-4 sm:pl-6 border-l border-[var(--border-subtle)]">
            <div className="flex items-center mr-2 sm:mr-4 cursor-pointer group">
              <div className="relative mr-0 sm:mr-3">
                <img
                  src={
                    user?.avatar ||
                    `https://ui-avatars.com/api/?name=${user?.username || "User"}&background=0B1122&color=F1F1F1`
                  }
                  alt={user?.username}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[var(--bg-surface)] group-hover:border-[var(--color-gardens)] transition-all"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[var(--color-gardens)] border-2 border-[var(--bg-app)] rounded-full"></div>
              </div>
              <div className="hidden sm:flex flex-col">
                <div className="text-sm font-semibold text-[var(--text-high-emphasis)] leading-tight group-hover:text-[var(--color-gardens)] transition-colors">
                  {user?.username || "Guest"}
                </div>
                <div className="text-xs text-[var(--text-muted)] leading-tight mt-0.5 max-w-[120px] truncate">
                  {user?.email || "guest@example.com"}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-[var(--text-muted)] hover:text-red-400 hover:bg-red-400/10 rounded-md transition-all focus:outline-none"
              title="Logout"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
