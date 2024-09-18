import axios from "axios";
import { AddEventData } from "./konser";
const PublicURL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const CreateEvent = async (eventData: AddEventData) => {
    try {
        const response = await axios.post(`${PublicURL}/make-event`, eventData, {
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        return response.data

    } catch (error) {
        console.error("Error fetching the Data:", error)
        throw error
    }

}