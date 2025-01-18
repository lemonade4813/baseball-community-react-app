import axios from "axios"

export const fetchSchedules = async () => {
    const { data } = await axios.get('http://localhost:8080/schedule');

    return data.data;
}