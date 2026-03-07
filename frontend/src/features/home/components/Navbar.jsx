import React, { useState } from "react";
import UploadModal from "./UploadModal";
import { LogOut } from "lucide-react";
const Navbar = ({ user, handleLogout }) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <nav className="w-full bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] px-6 py-3 sticky top-0 z-50 shadow-sm">
      <div className=" mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="text-2xl font-bold cursor-pointer text-[var(--text-high-emphasis)] tracking-tight">
          Kibun
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative">
            <button
              onClick={() => setIsUploadOpen(!isUploadOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-hover)] text-[var(--btn-primary-text)] text-sm font-medium rounded-[4px] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--btn-primary-bg)]/50 focus:ring-offset-2 focus:ring-offset-[var(--bg-surface)]"
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
          </div>

          <div className="flex items-center pl-4 sm:pl-6 border-l border-[var(--border-subtle)]">
            <div className="flex items-center mr-2 sm:mr-4 cursor-pointer group">
              <div className="relative mr-0 sm:mr-3">
                <img
                  src={
                    user?.avatar ||
                    `https://ui-avatars.com/api/?name=${user?.username || "User"}&background=0B1122&color=F1F1F1`
                  }
                  alt={user?.username}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-transparent group-hover:border-[var(--btn-primary-bg)] transition-all"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[var(--btn-primary-bg)] border-2 border-[var(--bg-surface)] rounded-[4px]"></div>
              </div>
              <div className="hidden sm:flex flex-col">
                <div className="text-sm font-semibold text-[var(--text-high-emphasis)] leading-tight group-hover:text-[var(--btn-primary-bg)] transition-colors">
                  {user?.username || "Guest"}
                </div>
                <div className="text-xs text-[var(--text-muted)] leading-tight mt-0.5 max-w-[120px] truncate">
                  {user?.email || "guest@example.com"}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text-high-emphasis)] hover:bg-[var(--bg-surface)] rounded-[4px] transition-all focus:outline-none"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
