import children from './children';
import { gql } from 'apollo-server-express';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default [
  children
];