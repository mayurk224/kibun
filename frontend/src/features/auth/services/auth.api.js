import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  console.log(
    `[API Request] ${config.method.toUpperCase()} ${config.url}`,
    config.data
  );
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(
      `[API Response] ${response.status} ${response.config.url}`,
      response.data
    );
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // Retry on network errors or 5xx server errors
    if (
      originalRequest &&
      (!error.response || error.response.status >= 500) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      console.log(`[Auto Retry] Retrying request ${originalRequest.url}...`);
      return new Promise((resolve) =>
        setTimeout(() => resolve(api(originalRequest)), 1000)
      );
    }

    console.error(
      `[API Error] ${error.response?.status} ${error.config?.url}`,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export async function register({ email, password, username }) {
  try {
    const response = await api.post("/auth/sign-up", {
      email,
      password,
      username,
    });
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}

export async function login({ identifier, password }) {
  try {
    const response = await api.post("/auth/sign-in", {
      identifier,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const response = await api.get("/auth/get-me");
    return response.data;
  } catch (error) {
    console.error("Get current user failed:", error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
}

export async function verifyEmail({ token }) {
  try {
    // Add _retry config to prevent interceptor from retrying, as the component handles retry logic
    const response = await api.post(
      "/auth/verify-email",
      { token },
      { _retry: true }
    );
    return response.data;
  } catch (error) {
    console.error("Verify email failed:", error);
    throw error;
  }
}

export async function resendVerifyEmail({ identifier }) {
  try {
    const response = await api.post("/auth/resend-verify-email", {
      identifier,
    });
    return response.data;
  } catch (error) {
    console.error("Resend verify email failed:", error);
    throw error;
  }
}
