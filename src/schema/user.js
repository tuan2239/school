import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    passwordHash: String!
    phone: String
  }

  extend type Mutation {
    signUp(signUpInput: SignUpInput!): User! 
  }

  type SignUpInput {
    name: String!
    email: String!
    passwordHash: String!
  }
`;