import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './docResolvers';

const typeDefs = `
type Query {
  loginUser(input: LoginUserInput!): User
}

type Mutation {
  # signupUser(input: SignupUserInput!): User
  register(input: RegisterInput!): User!
  login(input: LoginInput!): User
}

# Basic Types
type User {
  id: ID! # unique & required
  username: String
  email: String!
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

input RegisterInput {
  username: String
  email: String!
  password: String!
}

input LoginInput {
  email: String!
  password: String!
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
