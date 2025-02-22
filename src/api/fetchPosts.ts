import axiosInstance from "../util/axiosIntance";


export const fetchPosts =  async (title : string, content : string) => {
    return  axiosInstance.get('/posts', { params : {title, content}}).then(res => res.data);
}