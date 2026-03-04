import { useContext } from "react";
import { AuthContext } from "../auth.contex";
import { register } from "../services/auth.api";

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

  async function handleRegister({ email, password, username }) {
    try {
      setIsLoading(true);
      setErrors({});
      const response = await register({ email, password, username });
      setUser(response.user);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrors(error.response.data.errors);
    }
  }

  async function handleLogin({ identifier, password }) {
    try {
      setIsLoading(true);
      setErrors({});
      const response = await login({ identifier, password });
      setUser(response.user);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrors(error.response.data.errors);
    }
  }

  async function handleLogout() {
    try {
      setIsLoading(true);
      setErrors({});
      await logout();
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrors(error.response.data.errors);
    }
  }

  async function handleGetMe() {
    try {
      setIsLoading(true);
      setErrors({});
      const response = await getCurrentUser();
      setUser(response.user);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrors(error.response.data.errors);
    }
  }

  async function handleVerifyEmail({ token }) {
    try {
      setIsLoading(true);
      setErrors({});
      await verifyEmail({ token });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrors(error.response.data.errors);
    }
  }

  async function handleResendVerifyEmail({ identifier }) {
    try {
      setIsLoading(true);
      setErrors({});
      await resendVerifyEmail({ identifier });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrors(error.response.data.errors);
    }
  }
};
