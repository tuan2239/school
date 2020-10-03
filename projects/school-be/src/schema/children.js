import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    children: [Children!]!
  }

  type Children {
    id: ID!
    name: String!
    grade: Float!
  }

  extend type Mutation {
    addChild(name: String!, grade: Float!): Children! 
  }
`;