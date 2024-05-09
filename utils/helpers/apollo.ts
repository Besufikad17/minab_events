import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';

export const createApolloClient = () => {
    const config = useRuntimeConfig();
    const cache = new InMemoryCache();
    const httpLink = new HttpLink({
        uri: config.public.GQL_HOST,
        fetchOptions: {
            mode: 'no-cors',
        },
    });

    return new ApolloClient({
        link: httpLink,
        cache,
    });
}



