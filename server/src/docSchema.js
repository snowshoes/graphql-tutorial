import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
enum PhoneNumberType {
  WORK
  HOME
}

enum AddressType {
  MAIN
  SUBS
}

schema {
  query: LoginQuery
  mutation: SignupMutation
}

type LoginQuery {
  loginUser(input: LoginUserInput!): LoginUserPayload
}

type SignupMutation {
  singupUser(input: SignupUserInput!): SignupUserPayload
}

# Basic Types
type User {
  id: ID! # unique & required
  username: String
  password: String!
  addresses: [Address]!
  emails: [String]! # required at least one
  phones: [Phone]!
  profile: Profile!
}

type Phone {
  id: ID!
  countryCode: String!
  number: String!
  type: PhoneNumberType!
}

type Profile {
  id: ID!
  title: String!
  firstName: String!
  lastName: String!
  avatar: String
  gender: String
}

type Address {
  id: ID!
  type: AddressType!
  streetName: String
  streetNumber: String
  floor: String
  city: String!
  country: String!
  postCode: String!
}

# Input Types
input LoginUserInput {
  email: Email!
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