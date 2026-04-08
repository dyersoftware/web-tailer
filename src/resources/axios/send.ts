import axiosInstance from "./axios";
import { tokenService } from "./token";
import type { AxiosRequestConfig, AxiosError } from "axios";

export const httpClient = {
  // GET request
  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      await handleApiError(error as AxiosError);
      throw error;
    }
  },

  // POST request
  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await axiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      await handleApiError(error as AxiosError);
      throw error;
    }
  },

  // PUT request
  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await axiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      await handleApiError(error as AxiosError);
      throw error;
    }
  },

  // DELETE request
  async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      await handleApiError(error as AxiosError);
      throw error;
    }
  },
};

// Production-ready error handler
async function handleApiError(error: AxiosError): Promise<void> {
  // Handle 401 Unauthorized - clear tokens and redirect
  if (error.response?.status === 401) {
    try {
      tokenService.clear();
      // Use window.location for reliable redirect in production
      window.location.href = "/";
    } catch (clearError) {
      // Fallback: ensure redirect happens even if token clearing fails
      console.error("Failed to clear tokens:", clearError);
      window.location.href = "/";
    }
    return;
  }

  // For other errors, let them bubble up with meaningful messages
  const message =
    error.response?.data &&
    typeof error.response.data === "object" &&
    "message" in error.response.data
      ? (error.response.data as { message: string }).message
      : error.message || "Request failed";

  // Re-throw with the processed error message
  throw new Error(message);
}
