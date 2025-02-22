import { useQuery } from "@tanstack/react-query"
import { fetchPosts } from "../../api/fetchPosts"

export interface IPost{
    id : string;
    title : string;
    content : string;
    author : string;
    createdAt : string;
}



export const usePostsQuery= (title : string, content : string) => {
    return useQuery<IPost[]>({queryKey : ['posts'], queryFn : () => fetchPosts(title, content) })
}