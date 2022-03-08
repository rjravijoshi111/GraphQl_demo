import { StatusBar } from "expo-status-bar";
import React from "react";
import { NativeBaseProvider } from "native-base";
import Root from "./src/index";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/graphql/Client";

export default function App() {
  return (
    <NativeBaseProvider>
      <ApolloProvider client={client}>
        <Root />
      </ApolloProvider>
    </NativeBaseProvider>
  );
}
