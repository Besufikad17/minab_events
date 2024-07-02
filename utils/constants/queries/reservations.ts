export const ReserveEventMutation = gql`
    mutation ReserveEventAction(
        $user_id: Int!,
        $event_id: Int!,
        $ticket_id: Int!,
        $status: String!,
    ) {
        ReserveEvent(
            user_id: $user_id,
            event_id: $event_id,
            ticket_id: $ticket_id,
            status: $status
        ) {
            id
            checkoutUrl
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
                thumbnail
                start_date
                end_date
            }
        }
    }
`;