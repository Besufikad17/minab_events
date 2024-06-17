export type Location = {
    id?: number,
    city: string,
    venue: string
};

export type LocationResponse = {
    locations: Location[]
}