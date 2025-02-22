import axiosInstance from "../util/axiosIntance";


export const fetchPostRecommend =  async (id : string) => {
    return  axiosInstance.get(`/posts/${id}/recommend/count`).then(res => res.data);
}