import axiosInstance from "../util/axiosIntance";

export const fetchStadiumsStatus = async () => {
    return  await axiosInstance.get('/stadium').then(res => res.data);
}