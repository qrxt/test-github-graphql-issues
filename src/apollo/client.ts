import { ApolloClient, InMemoryCache } from "@apollo/client";
import config from "../config.json";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.VITE_GITHUB_TOKEN}`,
    },
  };
});

export const client = new ApolloClient({
  headers: {
    authorization: `Bearer ${process.env.VITE_GITHUB_TOKEN}`,
  },
  uri: config.network.requestUrlBase,
  cache: new InMemoryCache(),
});

export default client;
