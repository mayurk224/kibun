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
      <main className="min-h-screen bg-(--bg-app) flex items-center justify-center p-6 text-(--text-high-emphasis)">
        <div className="w-full max-w-md bg-(--bg-surface) p-8 rounded-2xl border border-(--border-subtle) shadow-xl relative overflow-hidden backdrop-blur-sm text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-32 bg-(--color-gardens) opacity-[0.03] blur-[60px] pointer-events-none"></div>
          <h1 className="text-3xl font-bold mb-2 text-(--text-high-emphasis)">
            Registration Successful!
          </h1>
          <p className="text-(--text-muted) text-sm mb-8">
            Please check your email to verify your account.
          </p>
          <div className="flex justify-center">
            <Link
              to="/login"
              className="inline-flex justify-center items-center bg-(--btn-primary-bg) text-(--btn-primary-text) font-semibold py-3 px-8 rounded-lg hover:bg-(--btn-primary-hover) transition-all h-[52px]"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-(--bg-app) flex items-center justify-center p-6 text-(--text-high-emphasis)">
      <div className="w-full max-w-md bg-(--bg-surface) p-8 rounded-2xl border border-(--border-subtle) shadow-xl relative overflow-hidden backdrop-blur-sm">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-32 bg-(--color-gardens) opacity-[0.03] blur-[60px] pointer-events-none"></div>

        <div className="text-center mb-8 relative">
          <h1 className="text-3xl font-bold mb-2 text-(--text-high-emphasis)">
            Create Account
          </h1>
          <p className="text-(--text-muted) text-sm">
            Join us today and get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative" noValidate>
          {errors.form && (
            <div
              className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
              role="alert"
            >
              {errors.form}
            </div>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-(--text-high-emphasis)"
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
                className={`w-full bg-[rgba(241,241,241,0.03)] border rounded-lg px-4 py-3 text-(--text-high-emphasis) placeholder:text-(--text-muted)/50 focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 ${
                  errors.username
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                    : "border-(--border-subtle) focus:border-(--color-gardens) focus:ring-(--color-gardens)"
                }`}
                aria-invalid={!!errors.username}
                aria-describedby={
                  errors.username ? "username-error" : undefined
                }
                disabled={isLoading}
              />
              {errors.username && (
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400 font-bold select-none"
                  aria-hidden="true"
                >
                  !
                </span>
              )}
            </div>
            {errors.username && (
              <span
                id="username-error"
                className="block text-sm text-red-400 mt-1"
                role="alert"
              >
                {errors.username}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-(--text-high-emphasis)"
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
                className={`w-full bg-[rgba(241,241,241,0.03)] border rounded-lg px-4 py-3 text-(--text-high-emphasis) placeholder:text-(--text-muted)/50 focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 ${
                  errors.email
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                    : "border-(--border-subtle) focus:border-(--color-gardens) focus:ring-(--color-gardens)"
                }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                disabled={isLoading}
              />
              {errors.email && (
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400 font-bold select-none"
                  aria-hidden="true"
                >
                  !
                </span>
              )}
            </div>
            {errors.email && (
              <span
                id="email-error"
                className="block text-sm text-red-400 mt-1"
                role="alert"
              >
                {errors.email}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-(--text-high-emphasis)"
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
                className={`w-full bg-[rgba(241,241,241,0.03)] border rounded-lg pl-4 pr-12 py-3 text-(--text-high-emphasis) placeholder:text-(--text-muted)/50 focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 ${
                  errors.password
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                    : "border-(--border-subtle) focus:border-(--color-gardens) focus:ring-(--color-gardens)"
                }`}
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-high-emphasis) transition-colors disabled:opacity-50 p-1"
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
              <span
                id="password-error"
                className="block text-sm text-red-400 mt-1"
                role="alert"
              >
                {errors.password}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-(--text-high-emphasis)"
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
                className={`w-full bg-[rgba(241,241,241,0.03)] border rounded-lg pl-4 pr-12 py-3 text-(--text-high-emphasis) placeholder:text-(--text-muted)/50 focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 ${
                  errors.confirmPassword
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                    : "border-(--border-subtle) focus:border-(--color-gardens) focus:ring-(--color-gardens)"
                }`}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword ? "confirm-password-error" : undefined
                }
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-high-emphasis) transition-colors disabled:opacity-50 p-1"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                disabled={isLoading}
              >
                {showConfirmPassword ? (
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
            {errors.confirmPassword && (
              <span
                id="confirm-password-error"
                className="block text-sm text-red-400 mt-1"
                role="alert"
              >
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-(--btn-primary-bg) text-(--btn-primary-text) font-semibold py-3 px-4 rounded-lg hover:bg-(--btn-primary-hover) transition-all disabled:opacity-70 flex justify-center items-center h-[52px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-(--btn-primary-text) border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-center text-sm text-(--text-muted) mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-(--color-gardens) hover:underline font-medium"
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
