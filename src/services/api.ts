import axios, { type AxiosInstance } from "axios";
import type { ApiResponse } from "../types/udang.types";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.error("Data tidak ditemukan:", error.response.data);
    } else if (error.response?.status === 500) {
      console.error("Server error:", error.response.data);
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout - server mungkin tidak merespon");
    }
    return Promise.reject(error);
  },
);

export default api;
