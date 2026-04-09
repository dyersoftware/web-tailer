import axios from "axios";
import { tokenService } from "./token";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});

// ✅ Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = tokenService.getAccessToken();

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (err) {
      console.error("Request interceptor error:", err);
      return Promise.reject(err);
    }
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

// ✅ Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    try {
      return response;
    } catch (err) {
      console.error("Response success handler error:", err);
      return Promise.reject(err);
    }
  },
  (error) => {
    try {
      console.log("Full error:", error);

      // 🔥 Important fix
      if (error?.response?.status === 401) {
        console.log("401 detected, clearing tokens and redirecting");
        tokenService.clear();
        window.location.href = "/";
      } else if (!error.response) {
        // ❗ Network / CORS / Server down case
        console.error("Network or CORS error:", error.message);
      }

      return Promise.reject(error);
    } catch (err) {
      console.error("Response error handler failed:", err);
      return Promise.reject(err);
    }
  },
);

export default axiosInstance;
