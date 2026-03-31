import axios from "axios";
import { API } from "../config/api";

const axiosInstance = axios.create({
  baseURL: API,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); 
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;