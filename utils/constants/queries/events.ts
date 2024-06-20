export const getAllEventsQuery = gql`
    query GetAllEvents {
        events_aggregate {
            aggregate {
                count
            }
        }
        events {
            id
            title
            user_id
            category {
                name
            }
            image
            enterance_fee
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

export const getEventsQuery = gql`
    query SearchEvent(
        $skip: Int = 0,
        $take: Int = 10,
    ) {
        events_aggregate {
            aggregate {
                count
            }
        }
        events(
            offset: $skip,
            limit: $take,
        ) {
            id
            title
            user_id
            category {
                name
            }
            image
            enterance_fee
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
                enterance_fee: {
                    _gte: $min_enterance_fee,
                    _lte: $max_enterance_fee
                },
                location:{
                    city:{
                        _ilike: $city
                    }
                },
                title: {
                    _ilike: $text
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
            image
            enterance_fee
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
                enterance_fee: {
                    _gte: $min_enterance_fee,
                    _lte: $max_enterance_fee
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
            image
            enterance_fee
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
      $image: String!,   
      $enterance_fee: float8!,   
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
        image: $image,
        enterance_fee: $enterance_fee,
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
            image
            enterance_fee
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
            image
            enterance_fee
            start_date
            end_date
            location {
                id
                city
                venue
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
        $image: String!, 
        $enterance_fee: float8!, 
        $start_date: date!, 
        $end_date: date!,
        $tags: [tags_insert_input!]!
    ) {
    update_locations(
        where: {
            id:{
                _eq: $location_id
            }
        },
        _set: {
            city: $city,
            venue: $venue
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
            image: $image,
            category_id: $category_id,
            enterance_fee: $enterance_fee,
            start_date: $start_date,
            end_date: $end_date,
        }
    ) {
        returning {
            title
            description
            image
            start_date
            end_date
            enterance_fee
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
