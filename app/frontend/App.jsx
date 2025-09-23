import React from "react";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

const client = new ApolloClient({
  uri: "/graphql", // Rails GraphQL endpoint
  cache: new InMemoryCache(),
});

const App = () => <div>Hello from React + Apollo!</div>;

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Root;
