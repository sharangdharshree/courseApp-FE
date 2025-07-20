import axios from "axios";
import config from "../utils/config.js";

const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true, // Include credentials (cookies) in requests
  timeout: 10000, // Set a timeout for requests
});

export default axiosInstance;
