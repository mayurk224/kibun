import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ResendVerifyEmail = () => {
  const { handleResendVerifyEmail } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier) {
      setError("Please enter your email or username");
      return;
    }

    setIsLoading(true);
    setMessage("");
    setError("");

    try {
      await handleResendVerifyEmail({ identifier });
      setMessage("Verification email sent! Please check your inbox.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to resend verification email.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--bg-app)] text-[var(--text-high-emphasis)] p-4">
      <div className="w-full max-w-md bg-[var(--bg-surface)] p-8 rounded-2xl shadow-2xl border border-[var(--border-subtle)] backdrop-blur-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">
            Resend Verification
          </h1>
          <p className="text-[var(--text-muted)] text-sm">
            Enter your email or username to receive a new verification link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {message && (
            <div className="p-3 rounded-md bg-green-500/10 border border-green-500/50 text-[#22c55e] text-sm text-center">
              {message}
            </div>
          )}
          {error && (
            <div className="p-3 rounded-md bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-[var(--text-muted)]"
            >
              Email or Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter email or username"
                className={`w-full bg-[#1A1F2E] text-[var(--text-high-emphasis)] border ${error ? "border-red-500" : "border-[var(--border-subtle)] focus:border-[var(--color-gardens)]"} rounded-lg px-4 py-3 outline-none transition-colors placeholder:text-[#4A5568]`}
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold py-3 rounded-lg hover:bg-[var(--btn-primary-hover)] transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none mt-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Send Link"
            )}
          </button>

          <p className="text-center text-sm text-[var(--text-muted)] pt-4 border-t border-[var(--border-subtle)] mt-4">
            <Link
              to="/login"
              className="text-[var(--text-high-emphasis)] font-medium hover:text-[var(--color-gardens)] transition-colors"
            >
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default ResendVerifyEmail;
