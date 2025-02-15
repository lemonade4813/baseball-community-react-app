import { useQuery } from "@tanstack/react-query"
import { fetchStadiumsStatus } from "../../api/fetchStadiumsStatus"

export const useStadiumsQuery = () => {
    return useQuery({queryKey : ['stadiumsStatus'], queryFn : fetchStadiumsStatus })
}