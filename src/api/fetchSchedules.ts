import axiosInstance from "../util/axiosIntance";


export const fetchSchedules = async () => {

    const headers = {'Content-type' : "application/json"};

    const { data } = await axiosInstance.get('/schedule',{ headers , withCredentials : true});

    return data;
}