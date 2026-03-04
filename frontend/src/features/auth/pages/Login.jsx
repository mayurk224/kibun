import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.scss";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.identifier) {
      newErrors.identifier = "Identifier is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const { handleLogin } = useAuth();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const { identifier, password } = formData;
      console.log("Login submitted:", { identifier, password });
      // Handle successful login here
      await handleLogin({ identifier, password });
      setIsLoading(false);
      setErrors({});
      // Redirect or show success message
      console.log("Login successful!");
    } catch (error) {
      setErrors({ form: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {errors.form && (
            <div className="form-error-message" role="alert">
              {errors.form}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="identifier">Identifier</label>
            <div
              className={`input-wrapper ${errors.identifier ? "error" : ""}`}
            >
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="Enter your identifier"
                aria-invalid={!!errors.identifier}
                aria-describedby={
                  errors.identifier ? "identifier-error" : undefined
                }
                disabled={isLoading}
              />
              {errors.identifier && (
                <span className="error-icon" aria-hidden="true">
                  !
                </span>
              )}
            </div>
            {errors.identifier && (
              <span id="identifier-error" className="error-text" role="alert">
                {errors.identifier}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className={`input-wrapper ${errors.password ? "error" : ""}`}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isLoading}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span id="password-error" className="error-text" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <div className="form-actions">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className={`submit-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? <span className="loader"></span> : "Sign In"}
          </button>

          <p className="register-link">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
