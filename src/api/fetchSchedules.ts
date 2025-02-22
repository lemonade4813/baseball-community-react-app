import axiosInstance from "../util/axiosIntance";

export const fetchSchedules = async () => {
    return  axiosInstance.get('/schedule').then(res => res.data);
}