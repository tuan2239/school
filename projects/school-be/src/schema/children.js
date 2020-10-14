import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    children: [Children!]!
  }

  type Children {
    name: String!
    grade: Int!
  }

  extend type Mutation {
    addChild(name: String!, grade: Int!): Children! 
    removeChild(id: ID!): Boolean
    updateChild(child: ChildrenUpdateInput!): Children!
  }

  input ChildrenUpdateInput{
    id: ID!
    name: String!
    grade: Int!
  }
`;