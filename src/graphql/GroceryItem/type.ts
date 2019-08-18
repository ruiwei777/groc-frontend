import { gql } from 'apollo-boost';

export const typeDefs = gql`
  type GroceryCategoryInput {
    name: String!
  }
`;
