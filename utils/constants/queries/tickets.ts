export const GetTicketById = gql`
    query GetTicketById(
        $id: Int!
    ) {
        tickets(
            where: {
                id: {
                    _eq: $id
                }
            }
        ) {
            price
            event_id
            ticket_type
        }
    }
`;