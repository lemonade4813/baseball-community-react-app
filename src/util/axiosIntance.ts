import axios from "axios";
import { useNavigate } from "react-router-dom";


const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_API_BASE_URL,
    withCredentials : true
});

axiosInstance.interceptors.response.use(
    (response) => {
      // 요청이 성공할 경우 그대로 반환
      return response;
    },
    (error) => {
      const navigate = useNavigate();
      
      if (error.response && error.response.status === 403) {
        console.log('오류 발생')
        navigate('/login');
      }
  
      // 오류를 그대로 반환
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;

