import axiosInstance from "../util/axiosIntance";


export const fetchPostDetail =  async (id : string) => {
    return  axiosInstance.get(`/posts/${id}`).then(res => res.data);
}