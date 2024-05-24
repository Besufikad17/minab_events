import { getAllEventsQuery } from "../constants/queries/events";

export const getAllEvents = async () => {
    const { data } = await useAsyncQuery(getAllEventsQuery);
    return data;   
}