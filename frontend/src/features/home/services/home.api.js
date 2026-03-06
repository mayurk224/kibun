import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(
      `[API Response] ${response.status} ${response.config.url}`,
      response.data,
    );
    return response;
  },
  (error) => {
    console.error(
      `[API Error] ${error.response?.status} ${error.config?.url}`,
      error.response?.data || error.message,
    );
    return Promise.reject(error);
  },
);

export async function uploadTrack(formData) {
  try {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}

export async function getAllMusic() {
  try {
    const response = await api.get("/music/all");
    return response.data;
  } catch (error) {
    console.error("Fetch music failed:", error);
    throw error;
  }
}
