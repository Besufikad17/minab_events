export const GetCategories = gql`
    query GetCategories {
        categories {
            id
            name
            image
        }
    }
`;