import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";

// POST 요청 커스텀 훅
export const useAxiosPost = <T, U>(url: string, config?: AxiosRequestConfig) => {
    const [data, setData] = useState<U | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const requestPost = useCallback(
      async (payload: T) => {
        setLoading(true);
        setError(null);
  
        try {
          const response = await axios.post<U>(url, payload, config);
          setData(response.data);
          return response.data;
        } catch (err) {
          setError(err instanceof Error ? err.message : "에러가 발생했습니다.");
          throw err;
        } finally {
          setLoading(false);
        }
      },
      [url, config]
    );
  
    return { data, loading, error, requestPost };
  };