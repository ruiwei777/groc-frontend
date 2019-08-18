import { gql } from 'apollo-boost';

export const GROCERY_ITEMS = gql`
{
  groceryItems {
    _id
    name
    categories {
      name
    }
  }
}
`