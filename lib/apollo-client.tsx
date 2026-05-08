"use client";

import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { type ReactNode } from "react";

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      new HttpLink({
        uri: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT,
      }),
    ]),
  });
}

let client: ApolloClient | undefined;

function getClient() {
  if (!client) client = makeClient();
  return client;
}

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={getClient()}>{children}</ApolloProvider>;
}
