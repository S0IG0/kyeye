import {InMemoryCache, ApolloClient, ApolloLink, HttpLink} from "@apollo/client";
import {createApolloProvider} from "@vue/apollo-option";
import {setContext} from "@apollo/client/link/context";
import {Auth} from "@/components/js/AuthModule";
import {urlBackend} from "@/components/config";

let token;
const contextLink = setContext(async () => {
    token = await Auth.getAuthorization()
    return {token}
})

const httpLink = new HttpLink({
    uri: `${urlBackend}/api/graphql`,
})

const authLink = new ApolloLink((operation, forward) => {
    const {token} = operation.getContext();
    if (token) {
        operation.setContext(({headers = {}}) => ({
            headers: {
                ...headers,
                Authorization: token,
            },
        }));
    }

    return forward(operation);
});

const link = ApolloLink.from([contextLink, authLink.concat(httpLink)]);
const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
    cache,
    link,
});

export const provider = createApolloProvider({
    defaultClient: apolloClient,
});