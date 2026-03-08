import { useContext, useCallback } from "react";
import { AuthContext } from "../auth.context";
import { register, login, logout, getCurrentUser } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const {
    user,
    isAuthenticated,
    isLoading,
    errors,
    setUser,
    setIsAuthenticated,
    setIsLoading,
    setErrors,
  } = context;

  const handleRegister = useCallback(
    async ({ email, password, username }) => {
      try {
        setIsLoading(true);
        setErrors({});
        await register({ email, password, username });
        setIsLoading(false);
        return true;
      } catch (error) {
        setIsLoading(false);
        const errData = error.response?.data;
        setErrors(
          errData?.errors || {
            form: errData?.message || "Registration failed",
          },
        );
        throw error;
      }
    },
    [setIsLoading, setErrors],
  );

  const handleLogin = useCallback(
    async ({ identifier, password }) => {
      try {
        setIsLoading(true);
        setErrors({});
        const response = await login({ identifier, password });
        setUser(response.user);
        setIsAuthenticated(true);
        setIsLoading(false);
        return response.user;
      } catch (error) {
        setIsLoading(false);
        const errData = error.response?.data;
        setErrors(
          errData?.errors || { form: errData?.message || "Login failed" },
        );
        throw error;
      }
    },
    [setIsLoading, setErrors, setUser, setIsAuthenticated],
  );

  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrors({});
      await logout();
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const errData = error.response?.data;
      setErrors(
        errData?.errors || { form: errData?.message || "Logout failed" },
      );
    }
  }, [setIsLoading, setErrors, setUser, setIsAuthenticated]);

  const handleGetMe = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrors({});
      const response = await getCurrentUser();
      setUser(response.user);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [setIsLoading, setErrors, setUser, setIsAuthenticated]);

  return {
    user,
    isAuthenticated,
    isLoading,
    errors,
    handleRegister,
    handleLogin,
    handleLogout,
    handleGetMe,
  };
};
