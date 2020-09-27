import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    children: [Children!]!
  }

  type Children {
    id: ID!
    name: String!
    grade: Float!
  }

  type Mutation {
    addChild(name: String!, grade: Float!): Children! 
  }
`;