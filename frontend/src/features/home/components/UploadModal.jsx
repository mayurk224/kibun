import React, { useEffect, useRef } from "react";

const UploadModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking on the toggle button itself (handled by the button's onClick)
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // Find if the click was on the toggle button to prevent double toggling
        const toggleBtn = document.querySelector(
          'button:has(span:contains("Upload"))',
        );
        if (
          toggleBtn &&
          (toggleBtn === event.target || toggleBtn.contains(event.target))
        ) {
          return;
        }
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="absolute top-full sm:right-0 -right-24 mt-3 w-[320px] bg-[#1f1f1f] border border-[#3f3f46] rounded-xl shadow-2xl shadow-black/50 z-50 p-5 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-white font-semibold text-lg">Upload Track</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-[#a1a1aa] hover:text-white hover:bg-[#3f3f46] transition-all focus:outline-none"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form className="space-y-4">
        {/* Audio Input */}
        <div>
          <label
            className="block text-sm font-medium text-[#e4e4e7] mb-1.5"
            htmlFor="audioFile"
          >
            Audio File{" "}
            <span className="text-[#a1a1aa] font-normal">(.mp3)</span>
          </label>
          <input
            type="file"
            id="audioFile"
            accept=".mp3"
            className="w-full text-sm text-[#a1a1aa]
              file:mr-4 file:py-2.5 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[#3f3f46] file:text-white
              hover:file:bg-[#52525b] cursor-pointer
              bg-[#27272a] rounded-lg border border-[#3f3f46] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1] transition-all"
          />
        </div>

        {/* Lyrics Input */}
        <div>
          <label
            className="block text-sm font-medium text-[#e4e4e7] mb-1.5"
            htmlFor="lyricsFile"
          >
            Lyrics File{" "}
            <span className="text-[#a1a1aa] font-normal">(.lrc)</span>
          </label>
          <input
            type="file"
            id="lyricsFile"
            accept=".lrc"
            className="w-full text-sm text-[#a1a1aa]
              file:mr-4 file:py-2.5 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[#3f3f46] file:text-white
              hover:file:bg-[#52525b] cursor-pointer
              bg-[#27272a] rounded-lg border border-[#3f3f46] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1] transition-all"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label
            className="block text-sm font-medium text-[#e4e4e7] mb-1.5"
            htmlFor="category"
          >
            Category
          </label>
          <div className="relative">
            <select
              id="category"
              defaultValue=""
              className="w-full bg-[#27272a] text-white text-sm border border-[#3f3f46] rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1] transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="surprise">Surprise</option>
              <option value="neutral">Neutral</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#a1a1aa]">
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
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 py-2.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-semibold rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:ring-offset-2 focus:ring-offset-[#1f1f1f]"
        >
          Upload Track
        </button>
      </form>
    </div>
  );
};

export default UploadModal;
