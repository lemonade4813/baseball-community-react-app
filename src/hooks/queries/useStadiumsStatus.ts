import { useQuery } from "@tanstack/react-query"
import { fetchStadiumsStatus } from "../../api/fetchStadiumsStatus"
import { IStadiumInfo } from "../../components/pages/StadiumsStatus"

export const useStadiumsQuery = () => {
    return useQuery<IStadiumInfo[]>({queryKey : ['stadiumsStatus'], queryFn : fetchStadiumsStatus })
}