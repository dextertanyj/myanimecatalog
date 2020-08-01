import { ApolloClient, ApolloLink } from '@apollo/client';
import { InMemoryCache, NormalizedCacheObject } from '@apollo/client/cache';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createHttpLink } from '@apollo/client/link/http';

type CreateOptions = {
  getToken: () => string;
};

const persistentUri =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/graphql'
    : process.env.REACT_APP_API_URL;

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const persistentHttpLink = createHttpLink({
  uri: persistentUri,
});

const cache: InMemoryCache = new InMemoryCache();

const errorLink = onError(
  ({ graphQLErrors, networkError, response, operation }) => {
    console.log({ graphQLErrors, networkError, response, operation });
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

const create = (
  initialState: NormalizedCacheObject,
  { getToken }: CreateOptions
): ApolloClient<NormalizedCacheObject> => {
  const authLink = setContext((_, { headers }) => {
    const token = getToken();

    if (token) {
      return {
        headers: {
          ...headers,
          authorization: token ? `Token ${token}` : '',
        },
      };
    } else {
      return { headers };
    }
  });

  return new ApolloClient({
    link: ApolloLink.from([authLink, errorLink, persistentHttpLink]),
    cache: cache.restore(initialState || {}),
    name: 'MyAnimeCatalog',
    version: '1',
  });
};

export default function initApollo(
  initialState: NormalizedCacheObject,
  options: CreateOptions
) {
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
