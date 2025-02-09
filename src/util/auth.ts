export const getAccessToken = (): string | null => {
    return sessionStorage.getItem('accessToken');
};
  
export const setAccessToken = (token: string) => {
    sessionStorage.setItem('accessToken', token);
};
  
export const removeAccessToken = () => {
    sessionStorage.removeItem('accessToken');
};