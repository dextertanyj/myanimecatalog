import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';

type CreateOptions = {
  getToken: () => string;
};

const IS_IP_ADDRESS = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
  window.location.hostname
);

const persistentUri =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/graphql'
    : `${window.location.protocol}//${window.location.hostname}${
        window.location.port
          ? `:${window.location.port}`
          : `${IS_IP_ADDRESS ? ':4000' : ''}`
      }/graphql`;

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const persistentHttpLink = createHttpLink({
  uri: persistentUri,
  // credentials: 'include', //'same-origin'
});

const cache: InMemoryCache = new InMemoryCache({
  cacheRedirects: {},
});

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
    name: 'Anime Database',
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
