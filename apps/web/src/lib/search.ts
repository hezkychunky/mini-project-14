import axios from "axios";
import { Konser } from "./konser";
const PublicURL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function searchConcerts(query: string): Promise<Konser[]> {
    if(!query) return []

    try {
        const response = await axios.get(`${PublicURL}/search`, {
            params: {
                query,
            }, timeout: 15000
        })
        const result = response.data
        return result
    } catch (error) {
        console.error("Error fetching the Search Result")
        return []
    }
}