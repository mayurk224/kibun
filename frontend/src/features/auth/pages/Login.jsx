import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const {
    handleLogin,
    isLoading,
    isAuthenticated,
    errors: authErrors,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Sync auth errors with local errors or just use them in render
  useEffect(() => {
    if (authErrors) {
      setErrors((prev) => ({ ...prev, ...authErrors }));
    }
  }, [authErrors]);

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

    if (!validateForm()) return;

    try {
      const { identifier, password } = formData;
      await handleLogin({ identifier, password });
      navigate("/");
    } catch (error) {
      // Errors are handled by useAuth and sync via useEffect
      console.error("Login failed", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="min-h-screen bg-(--bg-app) flex items-center justify-center p-6 text-(--text-high-emphasis) font-sans pt-24 pb-12">
      <div className="w-full max-w-md bg-(--bg-surface) p-8 rounded-2xl border border-(--border-subtle) shadow-xl relative overflow-hidden backdrop-blur-sm">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-32 bg-(--color-gardens) opacity-[0.03] blur-[60px] pointer-events-none"></div>

        <div className="text-center mb-8 relative">
          <h1 className="text-3xl font-bold mb-2 text-(--text-high-emphasis)">
            Welcome Back
          </h1>
          <p className="text-(--text-muted) text-sm">
            Please enter your details to sign in
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative" noValidate>
          {errors.form && (
            <div
              className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
              role="alert"
            >
              {errors.form}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-(--text-high-emphasis)"
            >
              Identifier
            </label>
            <div className="relative">
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="Enter your identifier"
                className={`w-full bg-[rgba(241,241,241,0.03)] border rounded-lg px-4 py-3 text-(--text-high-emphasis) placeholder:text-(--text-muted)/50 focus:outline-none focus:ring-1 transition-colors disabled:opacity-50 ${
                  errors.identifier
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                    : "border-(--border-subtle) focus:border-(--color-gardens) focus:ring-(--color-gardens)"
                }`}
                aria-invalid={!!errors.identifier}
                aria-describedby={
                  errors.identifier ? "identifier-error" : undefined
                }
                disabled={isLoading}
              />
              {errors.identifier && (
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400 font-bold select-none"
                  aria-hidden="true"
                >
                  !
                </span>
              )}
            </div>
            {errors.identifier && (
              <span
                id="identifier-error"
                className="block text-sm text-red-400 mt-1"
                role="alert"
              >
                {errors.identifier}
              </span>
            )}
          </div>

          <div className="space-y-2">
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
                placeholder="Enter your password"
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

          <div className="flex items-center justify-between text-sm mt-6">
            <label className="flex items-center gap-2 cursor-pointer text-(--text-muted) hover:text-(--text-high-emphasis) transition-colors">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
                className="w-4 h-4 rounded border-(--border-subtle) bg-[rgba(241,241,241,0.03)] text-(--color-gardens) focus:ring-(--color-gardens) focus:ring-offset-0 disabled:opacity-50"
              />
              <span>Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-(--color-gardens) hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-(--btn-primary-bg) text-(--btn-primary-text) font-semibold py-3 px-4 rounded-lg hover:bg-(--btn-primary-hover) transition-all disabled:opacity-70 flex justify-center items-center h-[52px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-(--btn-primary-text) border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="text-center text-sm text-(--text-muted) mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-(--color-gardens) hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
