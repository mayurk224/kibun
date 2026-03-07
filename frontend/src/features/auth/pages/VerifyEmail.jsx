import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const { handleVerifyEmail } = useAuth();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("");

  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const hasCalledVerify = React.useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token provided.");
      return;
    }

    // Prevent multiple calls if already verifying or success
    if (hasCalledVerify.current) {
      return;
    }

    const verify = async () => {
      hasCalledVerify.current = true;
      try {
        console.log(
          `Attempting verification (Attempt ${retryCount + 1}/${
            MAX_RETRIES + 1
          })...`,
        );
        await handleVerifyEmail({ token });
        setStatus("success");
        setMessage(
          "Email verified successfully! You can now login. Redirecting...",
        );
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        console.error("Verification error:", error);

        // Check if it's a network error or 500 error to retry
        const isNetworkError = !error.response;
        const isServerError = error.response?.status >= 500;

        if ((isNetworkError || isServerError) && retryCount < MAX_RETRIES) {
          console.log(`Verification failed. Retrying in 2 seconds...`);
          hasCalledVerify.current = false; // Allow retry to proceed
          setTimeout(() => {
            setRetryCount((prev) => prev + 1);
          }, 2000);
          return;
        }

        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Verification failed. The link may be invalid or expired.",
        );
      }
    };

    if (status === "verifying") {
      verify();
    }
  }, [token, handleVerifyEmail, retryCount]);

  return (
    <main className="min-h-screen bg-(--bg-app) flex items-center justify-center p-6 text-(--text-high-emphasis) font-sans pt-24 pb-12">
      <div className="w-full max-w-md bg-(--bg-surface) p-8 rounded-2xl border border-(--border-subtle) shadow-xl relative overflow-hidden backdrop-blur-sm text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-32 bg-(--color-gardens) opacity-[0.03] blur-[60px] pointer-events-none"></div>
        <div className="mb-2 relative">
          <h1 className="text-3xl font-bold mb-2 text-(--text-high-emphasis)">
            Email Verification
          </h1>

          {status === "verifying" && (
            <div className="py-8">
              <div className="w-10 h-10 border-4 border-(--color-gardens) border-t-transparent rounded-full animate-spin mx-auto mb-4 opacity-80"></div>
              <p className="text-(--text-muted)">Verifying your email...</p>
            </div>
          )}

          {status === "success" && (
            <div className="py-4">
              <div className="w-16 h-16 bg-(--color-gardens)/10 text-(--color-gardens) rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-lg text-(--text-high-emphasis) mb-8">
                {message}
              </p>
              <Link
                to="/login"
                className="inline-flex justify-center items-center bg-(--btn-primary-bg) text-(--btn-primary-text) font-semibold py-3 px-8 rounded-lg hover:bg-(--btn-primary-hover) transition-all h-[52px] w-full"
              >
                Go to Login
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="py-4">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="text-red-400 mb-8">{message}</p>
              <div className="space-y-4">
                <Link
                  to="/resend-verify-email"
                  className="inline-flex justify-center items-center bg-[rgba(241,241,241,0.03)] text-(--text-high-emphasis) font-semibold py-3 px-8 rounded-lg hover:bg-[rgba(241,241,241,0.08)] border border-(--border-subtle) transition-all h-[52px] w-full"
                >
                  Resend Verification Email
                </Link>
                <Link
                  to="/login"
                  className="block text-sm text-(--text-muted) hover:text-(--text-high-emphasis) transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default VerifyEmail;
