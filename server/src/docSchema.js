import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './docResolvers';

const typeDefs = `
type Query {
  loginUser(input: LoginUserInput!): LoginUserPayload
}

type Mutation {
  singupUser(input: SignupUserInput!): SignupUserPayload
}

# Basic Types
type User {
  id: ID! # unique & required
  username: String!
  password: String!
}

# Input Types
input LoginUserInput {
  username: String!
  password: String!
}

input SignupUserInput {
  user: User!
}

# Custom Payload Types
type LoginUserPayload {
  # nullable if there is an error
  # then null won't propagate to user
  user: User
}

type SignupUserPayload {
  # nullable for same reason as before
  user: User
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
