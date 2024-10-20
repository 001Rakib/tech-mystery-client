import axios from "axios";
import Cookies from "js-cookie"; // For client-side cookies
import { cookies } from "next/headers"; // For server-side cookies

import { getNewAccessToken } from "@/src/services/AuthService";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "https://a6-tech-tips-server.vercel.app", // Update to your backend URL
});

// Interceptor to add Authorization header before sending the request
axiosInstance.interceptors.request.use(
  function (config) {
    if (typeof window === "undefined") {
      // Server-side
      const cookieStore = cookies();
      const accessToken = cookieStore.get("accessToken")?.value;

      if (accessToken) {
        config.headers.Authorization = accessToken; // No Bearer prefix
      }
    } else {
      // Client-side
      const accessToken = Cookies.get("accessToken");

      if (accessToken) {
        config.headers.Authorization = accessToken; // No Bearer prefix
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Interceptor to handle token refresh on 401 responses
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const config = error.config;

    // If the error is 401 (Unauthorized) and request has not been retried yet
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      // Get a new access token
      const res = await getNewAccessToken();
      const newAccessToken = res.data.accessToken;

      // Set the new token - client-side
      if (typeof window !== "undefined") {
        Cookies.set("accessToken", newAccessToken);
      }

      // Re-try the original request with the new token
      config.headers["Authorization"] = newAccessToken; // No Bearer prefix

      return axiosInstance(config); // Retry request with updated config
    } else {
      return Promise.reject(error);
    }
  },
);

export default axiosInstance;
