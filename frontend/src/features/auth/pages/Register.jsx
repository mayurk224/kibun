import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { validateRegistrationForm } from "../utils/validation";

const Register = () => {
  const { handleRegister } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (errors.form) {
      setErrors((prev) => ({ ...prev, form: "" }));
    }
  };

  const validateForm = () => {
    const { isValid, errors: newErrors } = validateRegistrationForm(formData);
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await handleRegister({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setIsSuccess(true);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setErrors((prev) => ({ ...prev, form: errorMessage }));
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[var(--bg-app)] text-[var(--text-high-emphasis)] p-4">
        <div className="w-full max-w-md bg-[var(--bg-surface)] p-8 rounded-2xl shadow-2xl border border-[var(--border-subtle)] backdrop-blur-sm text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 tracking-tight">
              Registration Successful!
            </h1>
            <p className="text-[var(--text-muted)] text-sm">
              Please check your email to verify your account.
            </p>
          </div>
          <div className="mt-8">
            <Link
              to="/login"
              className="inline-block w-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold py-3 rounded-lg hover:bg-[var(--btn-primary-hover)] transition-all active:scale-[0.98]"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--bg-app)] text-[var(--text-high-emphasis)] p-4">
      <div className="w-full max-w-md bg-[var(--bg-surface)] p-8 rounded-2xl shadow-2xl border border-[var(--border-subtle)] backdrop-blur-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">
            Create Account
          </h1>
          <p className="text-[var(--text-muted)] text-sm">
            Join us today and get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {errors.form && (
            <div
              className="p-3 rounded-md bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center"
              role="alert"
            >
              {errors.form}
            </div>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-[var(--text-muted)]"
            >
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className={`w-full bg-[#1A1F2E] text-[var(--text-high-emphasis)] border ${errors.username ? "border-red-500" : "border-[var(--border-subtle)] focus:border-[var(--color-gardens)]"} rounded-lg px-4 py-3 outline-none transition-colors placeholder:text-[#4A5568]`}
                aria-invalid={!!errors.username}
                disabled={isLoading}
              />
            </div>
            {errors.username && (
              <span
                id="username-error"
                className="text-red-400 text-xs mt-1 block"
                role="alert"
              >
                {errors.username}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--text-muted)]"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full bg-[#1A1F2E] text-[var(--text-high-emphasis)] border ${errors.email ? "border-red-500" : "border-[var(--border-subtle)] focus:border-[var(--color-gardens)]"} rounded-lg px-4 py-3 outline-none transition-colors placeholder:text-[#4A5568]`}
                aria-invalid={!!errors.email}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <span
                id="email-error"
                className="text-red-400 text-xs mt-1 block"
                role="alert"
              >
                {errors.email}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--text-muted)]"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className={`w-full bg-[#1A1F2E] text-[var(--text-high-emphasis)] border ${errors.password ? "border-red-500" : "border-[var(--border-subtle)] focus:border-[var(--color-gardens)]"} rounded-lg px-4 py-3 outline-none transition-colors placeholder:text-[#4A5568] pr-12`}
                aria-invalid={!!errors.password}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-high-emphasis)] transition-colors p-1"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
                    width="18"
                    height="18"
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
              <span
                id="password-error"
                className="text-red-400 text-xs mt-1 block"
                role="alert"
              >
                {errors.password}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[var(--text-muted)]"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`w-full bg-[#1A1F2E] text-[var(--text-high-emphasis)] border ${errors.confirmPassword ? "border-red-500" : "border-[var(--border-subtle)] focus:border-[var(--color-gardens)]"} rounded-lg px-4 py-3 outline-none transition-colors placeholder:text-[#4A5568] pr-12`}
                aria-invalid={!!errors.confirmPassword}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-high-emphasis)] transition-colors p-1"
                onClick={toggleConfirmPasswordVisibility}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
                    width="18"
                    height="18"
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
            {errors.confirmPassword && (
              <span
                id="confirm-password-error"
                className="text-red-400 text-xs mt-1 block"
                role="alert"
              >
                {errors.confirmPassword}
              </span>
            )}
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
              "Create Account"
            )}
          </button>

          <p className="text-center text-sm text-[var(--text-muted)] pt-4 border-t border-[var(--border-subtle)] mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[var(--text-high-emphasis)] font-medium hover:text-[var(--color-gardens)] transition-colors ml-1"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
