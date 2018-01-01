export default `
  type Query {
    login(input: LoginInput!): User
  }

  type Mutation {
    register(input: RegisterInput!): User!
  }

  type User {
    id: ID! # unique & required
    username: String
    email: String!
    phones: [Phone]!
  }
`;
