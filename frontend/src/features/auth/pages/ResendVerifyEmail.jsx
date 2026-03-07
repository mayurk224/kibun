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
    <main className="min-h-screen bg-(--bg-app) flex items-center justify-center p-6 text-(--text-high-emphasis) font-sans pt-24 pb-12">
      <div className="w-full max-w-md bg-(--bg-surface) p-8 rounded-2xl border border-(--border-subtle) shadow-xl relative overflow-hidden backdrop-blur-sm">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-32 bg-(--color-gardens) opacity-[0.03] blur-[60px] pointer-events-none"></div>

        <div className="text-center mb-8 relative">
          <h1 className="text-3xl font-bold mb-2 text-(--text-high-emphasis)">
            Resend Verification
          </h1>
          <p className="text-(--text-muted) text-sm">
            Enter your email or username to receive a new verification link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative">
          {message && (
            <div className="p-3 bg-(--color-gardens)/10 border border-(--color-gardens)/30 rounded-lg text-(--color-gardens) text-sm">
              {message}
            </div>
          )}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-(--text-high-emphasis)"
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
                className={`w-full bg-[rgba(241,241,241,0.03)] border rounded-lg px-4 py-3 text-(--text-high-emphasis) placeholder:text-(--text-muted)/50 focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 ${
                  error
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                    : "border-(--border-subtle) focus:border-(--color-gardens) focus:ring-(--color-gardens)"
                }`}
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-(--btn-primary-bg) text-(--btn-primary-text) font-semibold py-3 px-4 rounded-lg hover:bg-(--btn-primary-hover) transition-all disabled:opacity-70 flex justify-center items-center h-[52px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-(--btn-primary-text) border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Send Link"
            )}
          </button>

          <p className="text-center text-sm text-(--text-muted) mt-6">
            <Link
              to="/login"
              className="text-(--color-gardens) hover:underline font-medium"
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
