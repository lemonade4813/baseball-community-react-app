import { useQuery } from "@tanstack/react-query"
import { fetchPostDetail } from "../../api/fetchPostDetail"

interface IPostDetail{
    id : string;
    title : string;
    content : string;
    author : string;
    createdAt : string;
}



export const usePostDetailQuery = (id : string) => {
    return useQuery<IPostDetail>({queryKey : ['postDetail', id], 
                                  queryFn : () => fetchPostDetail(id) }
                                )
}