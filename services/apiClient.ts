import { getToken } from "@/utils/user-token";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// 只有在客户端才添加token
if (typeof window !== "undefined") {
  apiClient.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

apiClient.interceptors.response.use((res) => {
  if (res.config.responseType === "blob") {
    return res;
  }
  const { data } = res;
  return data as any;
});

export default apiClient;
