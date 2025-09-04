// utils/axiosConfig.ts
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { StorageManager } from "./storageManager";
import { url } from "./constants";

let store: any = null;

export const setAxiosStore = (storeInstance: any) => {
  store = storeInstance;
};

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
  timeout: 10000,
});

let isRefreshing = false;

type FailedRequest = {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
};

let failedQueue: FailedRequest[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
): void => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("base url is ", config);
    console.log("Making request to:", config.url);
    return config;
  },
  (error: AxiosError) => {
    console.log("error occured while requesting at axios instnace");
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("after request axios things");
    return response;
  },
  async (error: AxiosError) => {
    console.log(
      "an error occured so you are here on axios interceptor response use error handling function "
    );
    console.log("error is ", error);
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log(
        "error status code is 401 and now we will try to send request again"
      );
      if (isRefreshing) {
        console.log("isRefreshing is true");
        return new Promise((resolve, reject) => {
          console.log("pushing resolve reject to failedQueue");
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            console.log("finally we are requesting agian and we are in then block")
            axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("Attempting to refresh token...");
        console.log(`sending to ${url}"/api/v1/refresh-token`)
        const response = await axios.post(
          `${url}/api/v1/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          console.log("Token refreshed successfully");
          processQueue(null);
          return axiosInstance(originalRequest);
        }
      } catch (refreshError: any) {
        console.error(
          "Token refresh failed:",
          refreshError.response?.data?.message
        );
        processQueue(refreshError, null);

        // Dispatch logout using redux store directly since we're outside React components
        if (store) {
          console.log(
            "we are in axios config condition where there is store possible"
          );
          store.dispatch({ type: "auth/forceLogout" });
        }

        StorageManager.clearAllData();

        // Redirect
        if (typeof window !== "undefined") {
          // window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
