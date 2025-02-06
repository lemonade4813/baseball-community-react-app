export const getAccessToken = (): string | null => {
    return localStorage.getItem('accesstoken');
  };
  
export const setAccessToken = (token: string) => {
    localStorage.setItem('accesstoken', token);
  };
  
export const removeAccessToken = () => {
    localStorage.removeItem('accesstoken');
  };