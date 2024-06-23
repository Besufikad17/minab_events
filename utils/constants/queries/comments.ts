export const SendCommentMutation = gql`
    mutation SendComment(
        $name: String!,
        $email: String!,
        $message: String
    ) {
        insert_comments(objects: {
            name: $name,
            email: $email,
            message: $message
        }) {
            affected_rows
        }
    }
`;