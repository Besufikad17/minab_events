import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';

const cache = new InMemoryCache();
const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_URL, // Your GraphQL server endpoint
    fetchOptions: {
        mode: 'no-cors', // Set the mode to 'no-cors'
    },
});
  
export const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
});

