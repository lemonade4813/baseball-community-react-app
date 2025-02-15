import axiosInstance from "../util/axiosIntance";


export const fetchSchedules =  () => {
    return  axiosInstance.get('/schedule').then(res => res.data);
}