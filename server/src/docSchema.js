import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './docResolvers';

const typeDefs = `
enum PhoneNumberType {
  WORK
  HOME
}

type Query {
  login(input: LoginInput!): User
}

type Mutation {
  register(input: RegisterInput!): User!
  # login(input: LoginInput!): User
}

# Basic Types
type User {
  id: ID! # unique & required
  username: String
  email: String!
  phones: [Phone]!
}

type Phone {
  id: ID!
  countryCode: String!
  number: String!
  phonetype: PhoneNumberType!
}

input RegisterInput {
  username: String
  email: String!
  password: String!
  phones: [PhoneInput]!
}

input PhoneInput {
  countryCode: String!
  number: String!
  phonetype: PhoneNumberType!
}

input LoginInput {
  email: String!
  password: String!
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
