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
    <main className="min-h-screen flex items-center justify-center bg-[var(--bg-app)] text-[var(--text-high-emphasis)] p-4">
      <div className="w-full max-w-md bg-[var(--bg-surface)] p-8 rounded-2xl shadow-2xl border border-[var(--border-subtle)] backdrop-blur-sm text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">
            Email Verification
          </h1>
          {status === "verifying" && (
            <p className="text-[var(--text-muted)] mt-4">
              Verifying your email...
            </p>
          )}
          {status === "success" && (
            <div className="mt-4">
              <p className="text-[#22c55e]">{message}</p>
              <Link
                to="/login"
                className="mt-6 inline-block w-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold py-3 rounded-lg hover:bg-[var(--btn-primary-hover)] transition-all active:scale-[0.98]"
              >
                Go to Login
              </Link>
            </div>
          )}
          {status === "error" && (
            <div className="mt-4">
              <p className="text-red-400">{message}</p>
              <div className="flex flex-col gap-3 mt-6">
                <Link
                  to="/resend-verify-email"
                  className="inline-block w-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold py-3 rounded-lg hover:bg-[var(--btn-primary-hover)] transition-all active:scale-[0.98]"
                >
                  Resend Verification Email
                </Link>
                <Link
                  to="/login"
                  className="inline-block w-full border border-[var(--border-subtle)] bg-transparent text-[var(--text-high-emphasis)] font-semibold py-3 rounded-lg hover:bg-[#1A1F2E] transition-all active:scale-[0.98]"
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
