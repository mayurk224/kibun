import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/register.scss";

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
        err.response?.data?.message || "Failed to resend verification email."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Resend Verification</h1>
          <p>Enter your email or username to receive a new verification link.</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {message && (
            <div className="success-message" style={{ color: "green", marginBottom: "1rem" }}>
              {message}
            </div>
          )}
          {error && (
            <div className="error-message" style={{ color: "red", marginBottom: "1rem" }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="identifier">Email or Username</label>
            <div className={`input-wrapper ${error ? "error" : ""}`}>
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter email or username"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`submit-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? <span className="loader"></span> : "Send Link"}
          </button>

          <p className="login-link">
            <Link to="/login">Back to Login</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default ResendVerifyEmail;
