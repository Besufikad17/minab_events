export const GetCategories = gql`
    query GetCategories {
        categories {
            name
            image
        }
    }
`;