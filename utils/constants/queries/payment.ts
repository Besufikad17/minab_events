export const GetPaymentById = gql`
    query GetPayment(
        $id: Int!
    ) {
        payments(
            where: {
                id: {
                    _eq: $id
                }
            }
        ) {
            ticket_id
        }
    }
`;

export const UpdatePaymentStatus = gql`
    mutation UpdatePaymentStatus(
        $id: Int!
    ) {
        update_payments(
            where: {
                id: {
                    _eq: $id
                }
            },
            _set: {
                status: "completed"
            }
        ) {
            affected_rows
        }
    }
`;