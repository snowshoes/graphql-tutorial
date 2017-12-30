import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './catResolvers';

const typeDefs = `
  type Cat {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    allCats: [Cat]!
  }

  type Mutation {
    createCat(input: CatInput): Cat
  }

  type CatPayload {
    cat: Cat
  }
  
  # input type
  input CatInput {
    name: String!
    age: Int!
  }
`;
const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
