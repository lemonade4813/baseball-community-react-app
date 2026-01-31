import { useCallback, useState } from "react";
import axiosInstance from "@/util/axiosIntance";

// POST 요청 커스텀 훅
export const useRequest = <T, U>() => {
    // const [data, setData] = useState<U | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const requestApi = useCallback(
      async (url: string,  
             method : 'POST' | 'PUT' | 'DELETE' = 'PUT',
             payload?: T, 
             callback? : () => void
             ) => {
        // async (url: string,  payload: T, config?: AxiosRequestConfig) => {
        setLoading(true);
        setError(null);
    

        try {
          await axiosInstance<U>({
                                    method,
                                    url, 
                                    data : payload,
                                });
          callback && callback();
        } catch (e) {
          setError(e instanceof Error ? e.message : "에러가 발생했습니다.");
          throw e;
        } finally {
          setLoading(false);
        }
      },
      []
    );
  
    return { loading, error, requestApi };
  };