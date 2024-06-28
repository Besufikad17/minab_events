export type Location = {
    id?: number;
    city: string;
    venue: string;
    longtiude: number;
    latitude: number;
    full_location?: string;
}

export type LocationResponse = {
    locations: Location[]
}

export type GeoApifyFeature = {
    type: string;
    properties: {
        datasource: {
            sourcename: string;
            attribution: string;
            license: string;
            url: string;
        },
        name: string;
        country: string;
        country_code: string;
        region: string;
        state: string;
        city: string;
        lon: number;
        lat: number;
        result_type: string;
        formatted: string;
        address_line1: string;
        address_line2: string;
        category: string;
        timezone: {
            name: string;
            offset_STD: string;
            offset_STD_seconds: number;
            offset_DST: string;
            offset_DST_seconds: number;
            abbreviation_STD: string;
            abbreviation_DST: string;
        },
        plus_code: string;
        plus_code_short: string;
        rank: {
            importance: number;
            confidence: number;
            confidence_city_level: number;
            match_type: string;
        },
        place_id: string;
    },
    geometry: {
        type: string;
        coordinates: number[];
    },
    bbox: number[];
}

export type GeoApifyResponse = {
    type: string;
    features: GeoApifyFeature[];
    query: {
        text: string;
        parsed: {
            city: string;
            expected_type: string;
        }
    }
}
