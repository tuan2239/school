import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    phone: String
  }

  extend type Mutation {
    signUp(signUpInput: SignUpInput!): Token!
    signIn(email: String!, password: String!): Token!
  }

  input SignUpInput {
    name: String!
    email: String!
    password: String!
    phone: String
  }

  type Token{
    token: String!
  }
`;