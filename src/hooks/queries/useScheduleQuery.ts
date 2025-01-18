import { useQuery } from "@tanstack/react-query"
import { fetchSchedules } from "../../api/fetchSchedules"

export const useSchedulesQuery = () => {
    return useQuery({queryKey : ['schedules'], queryFn : fetchSchedules })
}