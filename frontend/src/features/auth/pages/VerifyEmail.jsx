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
          })...`
        );
        await handleVerifyEmail({ token });
        setStatus("success");
        setMessage(
          "Email verified successfully! You can now login. Redirecting..."
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
            "Verification failed. The link may be invalid or expired."
        );
      }
    };

    if (status === "verifying") {
      verify();
    }
  }, [token, handleVerifyEmail, retryCount]);

  return (
    <main className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Email Verification</h1>
          {status === "verifying" && <p>Verifying your email...</p>}
          {status === "success" && (
            <div className="success-message">
              <p>{message}</p>
              <Link
                to="/login"
                className="submit-btn"
                style={{
                  marginTop: "1rem",
                  display: "inline-block",
                  textDecoration: "none",
                }}
              >
                Go to Login
              </Link>
            </div>
          )}
          {status === "error" && (
            <div className="error-message">
              <p style={{ color: "red" }}>{message}</p>
              <Link
                to="/resend-verify-email"
                style={{ display: "block", marginTop: "1rem" }}
              >
                Resend Verification Email
              </Link>
              <Link
                to="/login"
                style={{ display: "block", marginTop: "0.5rem" }}
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default VerifyEmail;
