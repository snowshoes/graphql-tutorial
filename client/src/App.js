import React, { Component } from "react";
import { graphql, ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import logo from "./logo.svg";
import "./App.css";
import ChannelsListWithData from "./components/ChannelsListWithData";
import AddChannel from "./components/AddChannel";

const link = createHttpLink({
  uri: "http://localhost:4000/graphql"
});

// createNetwokInterface is deprecated in favor of apollo-link-http
// https://github.com/apollographql/react-apollo/issues/1283
// examples to connect to apollo-server
// https://github.com/apollographql/react-docs/pull/306/files
const client = new ApolloClient({
  //link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  link: link,
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">React + GraphQL + Apollo Tutorial</h1>
          </header>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
