export const searchEventQuery = gql`
    query SearchEvent(
        $skip: Int = 0, 
        $take: Int = 6,
        $text: String = "%%",
        $min_enterance_fee: float8 = 0,
        $max_enterance_fee: float8 = 0,
        $category: String = "%%",
        $city: String = "%%"
    ) {
        events_aggregate {
            aggregate {
                count
            }
        }
        events(
            where: {
                category:{
                    name: {
                        _ilike: $category
                    }
                },
                location:{
                    city:{
                        _ilike: $city
                    }
                },
                title: {
                    _ilike: $text
                },
                tickets: {
                    _gte: $min_enterance_fee,
                    _lte: $max_enterance_fee
                }
            },
            offset: $skip, 
            limit: $take
        ) {
            id
            title
            user_id
            category {
                name
            }
            thumbnail
            start_date
            end_date
            location {
                city
                venue
            }
            tags {
                name
            }
        }
    }
`;

export const searchEventQueryWithTags = gql`
    query SearchEvent(
        $skip: Int = 0, 
        $take: Int = 6,
        $text: String = "%%",
        $min_enterance_fee: float8 = 0,
        $max_enterance_fee: float8 = 0,
        $category: String = "%%",
        $city: String = "%%",
        $tags: [String!] = []
    ) {
        events_aggregate {
            aggregate {
                count
            }
        }
        events(
            where: {
                category:{
                    name: {
                        _ilike: $category
                    }
                },
                location:{
                    city:{
                        _ilike: $city
                    }
                },
                tags: {
                    name: {
                        _in: $tags
                    }
                },
                title: {
                    _ilike: $text
                },
                tickets: {
                    _gte: $min_enterance_fee,
                    _lte: $max_enterance_fee
                }
            },
            offset: $skip, 
            limit: $take
        ) {
            id
            title
            user_id
            category {
                name
            }
            thumbnail
            start_date
            end_date
            location {
                city
                venue
            }
            tags {
                name
            }
        }
    }
`;

export const AddEventQuery = gql`
    mutation CreateEventAction(
        $title: String!,   
        $description: String!,  
        $user_id: Int!,   
        $category_id: Int!,   
        $city: String!,
        $venue: String!,
        $lat: float8!,
        $lng: float8!,
        $images: [String!]!,   
        $tickets: [tickets_input!]!,
        $start_date: date!,   
        $end_date: date!,
        $tags: [String!]!
    ) {
        CreateEvent(
            title: $title,
            description: $description,
            user_id: $user_id,
            category_id: $category_id,
            city: $city,
            venue: $venue,
            lat: $lat,
            lng: $lng,
            images: $images,
            tickets: $tickets,
            start_date: $start_date,
            end_date: $end_date,
            tags: $tags
        ) {
            id
        }
    }
`;

export const GetMyEventsQuery = gql`
    query GetMyEvents($user_id: Int!, $skip: Int!, $take: Int!){
        events_aggregate {
            aggregate {
                count
            }
        }
        events(
            where:{
                user_id: {
                _eq: $user_id
                }
            },
            offset: $skip,
            limit: $take
        ) {
            id
            title
            user_id
            category {
                name
            }
            thumbnail
            start_date
            end_date
            location {
                city
                venue
            }
        }
    }
`;

export const GetEventByIdQuery = gql`
    query GetEventById ($id: Int!) {
        events(where:{ id: { _eq: $id } }) {
            id
            user_id
            title
            description
            category {
                id
                name
            }
            thumbnail
            images {
                url
            }
            start_date
            end_date
            location {
                id
                city
                venue
                latitude
                longtiude
                full_location
            }
            tags {
                name
            }
            bookmarks {
                user_id
            }
            reserved_events {
                user_id
            }
            tickets {
                ticket_type
                description
                price
            }
        }
    }
`;

export const UpdateEventMutation = gql`
    mutation UpdateEvent(
        $id: Int!, 
        $title: String!, 
        $description: String!, 
        $category_id: Int!, 
        $location_id: Int!,
        $city: String!,
        $venue: String!,
        $lat: float8!,
        $lng: float8!,
        $thumbnail: String!,
        $images: [AddImagesImagesInsertInput!]!, 
        $start_date: date!, 
        $end_date: date!,
        $tags: [tags_insert_input!]!,
        $tickets: [tickets_insert_input!]!
    ) {
        update_locations(
            where: {
                id:{
                    _eq: $location_id
                }
            },
            _set: {
                city: $city,
                venue: $venue,
                latitude: $lat,
                longtiude: $lng
            }
        ) {
            returning {
                city
                venue
            }
        }
        update_events(
            where: {
                id: {
                    _eq: $id
                }
            },
            _set: {
                title: $title,
                description: $description,
                category_id: $category_id,
                thumbnail: $thumbnail,
                start_date: $start_date,
                end_date: $end_date,
            }
        ) {
            returning {
                title
                description
                thumbnail
                start_date
                end_date
            }
        }
        delete_tags(
            where: {
                event_id: {
                    _eq: $id
                }
            }
        ) {
            affected_rows
        }
        insert_tags(objects: $tags) {
            returning {
                id
            }
        }
        delete_images(
            where: {
                event_id: {
                    _eq: $id
                }
            }
        ) {
            affected_rows
        }
        AddImages(images: $images) {
            affected_rows
        }
        delete_tickets(
            where: {
                event_id: {
                    _eq: $id
                }
            }
        ) {
            returning {
                id
            }
        }
        insert_tickets(
            objects: $tickets
        ) {
            returning {
                id
            }
        }
    }
`;

export  const DeleteEventMutation = gql`
    mutation DeleteEvent($id: Int!, $location_id: Int!) {
        delete_locations(
            where: {
                id: {
                    _eq: $location_id
                }
            }
        ) {
            returning {
                id
            }
        }
        delete_events(
            where: {
                id: {
                    _eq: $id
                }
            }
        ) {
            returning {
                id
            }
        }
        delete_tags(
            where: {
                event_id: {
                    _eq: $id
                }
            }
        ) {
            returning {
                id
            }
        }
    }
`;
