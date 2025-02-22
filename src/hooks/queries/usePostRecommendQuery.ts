import { useQuery } from "@tanstack/react-query"
import { fetchPostRecommend } from "../../api/fetchPostRecommend"


interface IPostRecommend{
    recommendedCount : number;
    notRecommendedCount : number;

}

export const usePostRecommendQuery= (id : string) => {
    return useQuery<IPostRecommend>({queryKey : ['postRecommend'], 
                     queryFn : () => fetchPostRecommend(id),
                     enabled : !!id
                    })
}