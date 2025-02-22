import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../util/axiosIntance";

export const useFetch = <T>(url: string, params? : any, config?: AxiosRequestConfig) => {
    
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchData = useCallback(async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await axiosInstance.get<T>(url,{params});
        setData(response.data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "에러가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }, [url, config]);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  
    return { data, loading, error, refetch: fetchData };
  };
  