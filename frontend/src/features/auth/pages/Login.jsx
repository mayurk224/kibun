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
    <main className="min-h-screen flex w-full bg-[var(--bg-app)] text-[var(--text-high-emphasis)]">
      {/* Left Panel - Hidden on mobile/tablet, 50% width on lg+ */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[var(--bg-surface)] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          alt="Abstract landscape"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-app)] via-[var(--bg-app)]/40 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-end p-16 w-full h-full pb-24">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            Immerse Yourself
          </h2>
          <p className="text-[var(--text-muted)] text-lg max-w-md">
            Join the community of artists and listeners.
          </p>
        </div>
      </div>

      {/* Right Panel - Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:px-16 lg:px-24 relative">
        <div className="w-full max-w-md mx-auto flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 mb-10">
            <div className="rounded shrink-0  flex items-center justify-center">
              <img src="/logo.png" alt="" className="w-6 h-6 " />
            </div>
            <span className="text-2xl font-bold tracking-tight">Kibun</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[var(--text-high-emphasis)] mb-2 tracking-tight">
              Welcome back
            </h1>
            <p className="text-[var(--text-muted)] text-sm">
              Enter your details to access your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-5" noValidate>
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
                htmlFor="identifier"
                className="block text-sm font-medium text-[var(--text-muted)]"
              >
                Email
              </label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="yours@example.com"
                className={`w-full bg-[var(--bg-surface)] text-[var(--text-high-emphasis)] border ${errors.identifier ? "border-red-500" : "border-[var(--border-subtle)] focus:border-[var(--color-gardens)]"} rounded transition-colors px-4 py-3 outline-none placeholder:text-[var(--text-muted)] placeholder:opacity-50`}
                disabled={isLoading}
              />
              {errors.identifier && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.identifier}
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
                  placeholder="••••••••"
                  className={`w-full bg-[var(--bg-surface)] text-[var(--text-high-emphasis)] border ${errors.password ? "border-red-500" : "border-[var(--border-subtle)] focus:border-[var(--color-gardens)]"} rounded transition-colors px-4 py-3 pr-12 outline-none placeholder:text-[var(--text-muted)] placeholder:opacity-50`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-high-emphasis)] transition-colors"
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

            {/* <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="peer appearance-none w-4 h-4 border border-[var(--border-subtle)] rounded bg-[var(--bg-surface)] checked:bg-[var(--btn-primary-bg)] checked:border-[var(--btn-primary-bg)] transition-colors cursor-pointer"
                    disabled={isLoading}
                  />
                  <svg
                    className="absolute w-3 h-3 text-[var(--btn-primary-text)] opacity-0 peer-checked:opacity-100 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-high-emphasis)] transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-[var(--color-gardens)] hover:text-[var(--btn-primary-hover)] transition-colors"
              >
                Forgot password?
              </Link>
            </div> */}

            <button
              type="submit"
              className="w-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold py-3 flex items-center justify-center mt-6 rounded transition-colors hover:bg-[var(--btn-primary-hover)] disabled:opacity-50"
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
                "Log In"
              )}
            </button>

            <p className="text-sm text-center text-[var(--text-muted)] mt-8 pt-6 border-t border-[var(--border-subtle)]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[var(--text-high-emphasis)] hover:text-[var(--color-gardens)] font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
