import React, { useEffect, useRef, useState } from "react";
import { useHome } from "../hooks/useHome";

const UploadModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const [audioFile, setAudioFile] = useState(null);
  const [lyricsFile, setLyricsFile] = useState(null);
  const [category, setCategory] = useState("");
  const { isUploading, message, setMessage, handleUploadTrack } = useHome();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!audioFile || !category) {
      setMessage({
        text: "Audio file and category are required",
        type: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("music", audioFile);
    if (lyricsFile) {
      formData.append("lyric", lyricsFile);
    }
    formData.append("mood", category);

    const success = await handleUploadTrack(formData);

    if (success) {
      setTimeout(() => {
        onClose();
        setAudioFile(null);
        setLyricsFile(null);
        setCategory("");
        setMessage({ text: "", type: "" });
      }, 2000);
    }
  };

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
      className="absolute top-full sm:right-0 -right-24 mt-3 w-[320px] bg-[var(--bg-surface)] backdrop-blur-xl border border-[var(--border-subtle)] rounded-xl shadow-2xl z-50 p-5 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[var(--text-high-emphasis)] font-bold tracking-tight text-lg">
          Upload Track
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-high-emphasis)] hover:bg-white/5 transition-all focus:outline-none"
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

      <form className="space-y-4" onSubmit={handleSubmit}>
        {message.text && (
          <div
            className={`p-3 rounded-lg text-sm ${message.type === "success" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}
          >
            {message.text}
          </div>
        )}

        {/* Audio Input */}
        <div>
          <label
            className="block text-sm font-medium text-[var(--text-high-emphasis)] mb-1.5"
            htmlFor="audioFile"
          >
            Audio File{" "}
            <span className="text-[var(--text-muted)] font-normal">(.mp3)</span>
          </label>
          <input
            type="file"
            id="audioFile"
            accept=".mp3"
            className="w-full text-sm text-[var(--text-muted)]
              file:mr-4 file:py-2.5 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[var(--bg-app)] file:text-[var(--text-high-emphasis)] file:border file:border-[var(--border-subtle)]
              hover:file:bg-white/5 cursor-pointer
              bg-[rgba(11,17,34,0.3)] rounded-lg border border-[var(--border-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] focus:border-[var(--color-gardens)] transition-all"
            onChange={(e) => setAudioFile(e.target.files[0])}
          />
        </div>

        {/* Lyrics Input */}
        <div>
          <label
            className="block text-sm font-medium text-[var(--text-high-emphasis)] mb-1.5"
            htmlFor="lyricsFile"
          >
            Lyrics File{" "}
            <span className="text-[var(--text-muted)] font-normal">(.lrc)</span>
          </label>
          <input
            type="file"
            id="lyricsFile"
            accept=".lrc"
            className="w-full text-sm text-[var(--text-muted)]
              file:mr-4 file:py-2.5 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[var(--bg-app)] file:text-[var(--text-high-emphasis)] file:border file:border-[var(--border-subtle)]
              hover:file:bg-white/5 cursor-pointer
              bg-[rgba(11,17,34,0.3)] rounded-lg border border-[var(--border-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] focus:border-[var(--color-gardens)] transition-all"
            onChange={(e) => setLyricsFile(e.target.files[0])}
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label
            className="block text-sm font-medium text-[var(--text-high-emphasis)] mb-1.5"
            htmlFor="category"
          >
            Category
          </label>
          <div className="relative">
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[rgba(11,17,34,0.3)] text-[var(--text-high-emphasis)] text-sm border border-[var(--border-subtle)] rounded-lg py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] focus:border-[var(--color-gardens)] transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Happy">Happy</option>
              <option value="Sad">Sad</option>
              <option value="Surprise">Surprise</option>
              <option value="Neutral">Neutral</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[var(--text-muted)]">
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
          disabled={isUploading}
          className="w-full mt-6 py-2.5 bg-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-[var(--btn-primary-text)] text-sm font-bold rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-app)] active:scale-[0.98]"
        >
          {isUploading ? "Uploading..." : "Upload Track"}
        </button>
      </form>
    </div>
  );
};

export default UploadModal;
