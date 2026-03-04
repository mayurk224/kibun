import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function register({ email, password, username }) {
  try {
    const response = await api.post("/auth/register", {
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
    const response = await api.post("/auth/login", {
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
    const response = await api.post("/auth/verify-email", {
      token,
    });
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
