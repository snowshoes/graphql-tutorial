import React, { Component } from "react";
import { graphql, ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { typeDefs } from "./schema";
import gql from "graphql-tag";
import logo from "./logo.svg";
import "./App.css";

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

const ChannelsList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <ul>{channels.map(ch => <li key={ch.id}>{ch.name}</li>)}</ul>;
};

const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Apollo</h1>
          </header>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
