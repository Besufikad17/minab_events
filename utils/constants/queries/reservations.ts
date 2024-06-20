export const ReserveEventMutation = gql`
    mutation ReserveEvent(
        $user_id: Int!,
        $event_id: Int!
    ) {
        insert_reserved_events(
            objects: {
                user_id: $user_id,
                event_id: $event_id
            }
        ) {
            returning {
                id
            }
        }
    }
`;

export const GetReservedEventsQuery = gql`
    query GetReservedEvent(
        $user_id: Int!,
        $skip: Int = 0,
        $take: Int = 6
    ) {
        reserved_events_aggregate {
            aggregate {
                count
            }
        }
        reserved_events(
            where: {
                user_id: {
                    _eq: $user_id
                }
            },
            offset: $skip,
            limit: $take
        ) {
            event {
                id
                title
                category {
                    name
                }
                location {
                    city
                    venue
                }
                image
                start_date
                end_date
            }
        }
    }
`;