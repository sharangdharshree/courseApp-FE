import axios from "axios";
import config from "../utils/config.js";

const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
  timeout: 10000,
});

// --- Token refresh state ---
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  failedQueue = [];
};

// --- Response interceptor: silent token refresh on 401 ---
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip interceptor for the refresh endpoint itself to prevent infinite loops
    if (originalRequest.url?.includes("/user/refresh-token")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Another refresh is already in flight — queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Direct axios call (not axiosInstance) to bypass this interceptor
        await axios.post(
          `${config.apiBaseUrl}/user/refresh-token`,
          {},
          { withCredentials: true }
        );
        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        // Lazy import to avoid circular dependency at module load time
        const { default: store } = await import("../redux/store/store.js");
        const { logout } = await import("../redux/features/authSlice.js");
        store.dispatch(logout());
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
