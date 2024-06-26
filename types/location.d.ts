export type Location = {
    id?: number;
    city: string;
    venue: string;
    full_location?: string;
}

export type LocationResponse = {
    locations: Location[]
}