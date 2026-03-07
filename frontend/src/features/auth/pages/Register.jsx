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

  return (
    <main className="min-h-screen flex w-full bg-(--bg-app) text-(--text-high-emphasis)">
      {/* Left Panel - Hidden on mobile/tablet, 50% width on lg+ */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-(--bg-surface) overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          alt="Abstract landscape"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-linear-to-t from-(--bg-app) via-(--bg-app)/40 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-end p-16 w-full h-full pb-24">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            Immerse Yourself
          </h2>
          <p className="text-(--text-muted) text-lg max-w-md">
            Join the community of artists and listeners.
          </p>
        </div>
      </div>

      {/* Right Panel - Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 relative">
        <div className="w-full max-w-md mx-auto flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 mb-10">
            <div className="rounded shrink-0 flex items-center justify-center">
              <img src="/logo.png" alt="" className="w-6 h-6 " />
            </div>
            <span className="text-2xl font-bold tracking-tight">Kibun</span>
          </div>

          {isSuccess ? (
            <div className="text-center py-10 mt-8">
              <div className="w-16 h-16 bg-(--color-gardens)/20 text-(--color-gardens) rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-(--text-high-emphasis) mb-4 tracking-tight">
                Registration Successful!
              </h1>
              <p className="text-(--text-muted) px-4">
                Please check your email to verify your account.
              </p>
              <div className="mt-10">
                <Link
                  to="/login"
                  className="inline-block w-full bg-(--btn-primary-bg) text-(--btn-primary-text) font-semibold py-3 rounded transition-colors hover:bg-(--btn-primary-hover)"
                >
                  Go to Login
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-(--text-high-emphasis) mb-2 tracking-tight">
                  Create an account
                </h1>
                <p className="text-(--text-muted) text-sm">
                  Join us today and get started
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="w-full space-y-4"
                noValidate
              >
                {errors.form && (
                  <div
                    className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded backdrop-blur-sm"
                    role="alert"
                  >
                    {errors.form}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-(--text-muted)"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="john_doe"
                    className={`w-full bg-(--bg-surface) text-(--text-high-emphasis) border ${errors.username ? "border-red-500" : "border-(--border-subtle) focus:border-(--color-gardens)"} rounded transition-colors px-4 py-3 outline-none placeholder:text-(--text-muted) placeholder:opacity-50`}
                    disabled={isLoading}
                  />
                  {errors.username && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.username}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-(--text-muted)"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yours@example.com"
                    className={`w-full bg-(--bg-surface) text-(--text-high-emphasis) border ${errors.email ? "border-red-500" : "border-(--border-subtle) focus:border-(--color-gardens)"} rounded transition-colors px-4 py-3 outline-none placeholder:text-(--text-muted) placeholder:opacity-50`}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-(--text-muted)"
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
                      className={`w-full bg-(--bg-surface) text-(--text-high-emphasis) border ${errors.password ? "border-red-500" : "border-(--border-subtle) focus:border-(--color-gardens)"} rounded transition-colors px-4 py-3 pr-12 outline-none placeholder:text-(--text-muted) placeholder:opacity-50`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-high-emphasis) transition-colors"
                      onClick={togglePasswordVisibility}
                      tabIndex="-1"
                    >
                      {showPassword ? (
                        <svg
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
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.password}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-(--text-muted)"
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
                      className={`w-full bg-(--bg-surface) text-(--text-high-emphasis) border ${errors.confirmPassword ? "border-red-500" : "border-(--border-subtle) focus:border-(--color-gardens)"} rounded transition-colors px-4 py-3 pr-12 outline-none placeholder:text-(--text-muted) placeholder:opacity-50`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-high-emphasis) transition-colors"
                      onClick={toggleConfirmPasswordVisibility}
                      tabIndex="-1"
                    >
                      {showConfirmPassword ? (
                        <svg
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
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-(--btn-primary-bg) text-(--btn-primary-text) font-semibold py-3 flex items-center justify-center mt-6 rounded transition-colors hover:bg-(--btn-primary-hover) disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
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
                    "Sign Up"
                  )}
                </button>

                <p className="text-sm text-center text-(--text-muted) mt-8 pt-6 border-t border-(--border-subtle)">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-(--color-gardens) font-medium transition-colors hover:opacity-80"
                  >
                    Log In
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Register;
