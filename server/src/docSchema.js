import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './docResolvers';

const typeDefs = `
type Query {
  loginUser(input: LoginUserInput!): User
}

type Mutation {
  signupUser(input: SignupUserInput!): User
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
  username: String!
  password: String!
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
