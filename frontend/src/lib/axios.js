import axios from "axios";

const rawApi = import.meta.env.VITE_API_URL?.trim() ?? "";
const trimmedApi = rawApi.replace(/\/+$/g, "");

const baseURL =
  trimmedApi.length > 0 ? `${trimmedApi}/api` : "/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  console.log(
    "AXIOS CALL →",
    `${config.baseURL || ""}${config.url || ""}`
  );
  return config;
});

export default axiosInstance;
