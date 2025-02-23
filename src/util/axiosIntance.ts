import axios from "axios";

const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_API_BASE_URL,
    withCredentials : true
});

axiosInstance.interceptors.request.use(
  (config) => {
    // if (config.method !== "get" && /^\/post\/.*/.test(config.url || "")) {
      const accessToken = sessionStorage.getItem("accessToken"); 
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`; 
      }
    // }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 403) {
        if (error.response?.status === 403) {
          const currentPath = window.location.pathname; 
          localStorage.setItem("redirectPath", currentPath);
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;

