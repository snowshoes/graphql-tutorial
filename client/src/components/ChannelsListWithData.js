import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import AddChannel from "./AddChannel";

const ChannelsList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div className="channelsList">
      <AddChannel />
      {channels.map(ch => (
        <div key={ch.id} className="channel">
          {ch.name}
        </div>
      ))}
    </div>
  );
};

export const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

const ChannelsListWithData = graphql(channelsListQuery, {
  options: { pollInterval: 5000 }
})(ChannelsList);

export default ChannelsListWithData;
