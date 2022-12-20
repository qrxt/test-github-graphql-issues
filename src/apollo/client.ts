import { ApolloClient, InMemoryCache } from "@apollo/client";
import config from "../config.json";

export const client = new ApolloClient({
  uri: config.network.requestUrlBase,
  cache: new InMemoryCache(),
});

export default client;
