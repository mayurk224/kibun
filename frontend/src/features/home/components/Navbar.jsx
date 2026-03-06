import React from "react";

const Navbar = ({ user, handleLogout }) => {
  return (
    <nav className="w-full bg-[#1f1f1f] border-b border-[#3f3f46] px-6 py-3 sticky top-0 z-50 shadow-sm">
      <div className=" mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="text-2xl font-bold cursor-pointer">Kibun</div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-medium rounded-md transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:ring-offset-2 focus:ring-offset-[#1f1f1f]">
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

          <div className="flex items-center pl-4 sm:pl-6 border-l border-[#3f3f46]">
            <div className="flex items-center mr-2 sm:mr-4 cursor-pointer group">
              <div className="relative mr-0 sm:mr-3">
                <img
                  src={
                    user?.avatar ||
                    `https://ui-avatars.com/api/?name=${user?.username || "User"}&background=2e2e2e&color=fff`
                  }
                  alt={user?.username}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-transparent group-hover:border-[#6366f1] transition-all"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22c55e] border-2 border-[#1f1f1f] rounded-full"></div>
              </div>
              <div className="hidden sm:flex flex-col">
                <div className="text-sm font-semibold text-[#ffffff] leading-tight group-hover:text-[#6366f1] transition-colors">
                  {user?.username || "Guest"}
                </div>
                <div className="text-xs text-[#a1a1aa] leading-tight mt-0.5 max-w-[120px] truncate">
                  {user?.email || "guest@example.com"}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-[#a1a1aa] hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded-md transition-all focus:outline-none"
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
