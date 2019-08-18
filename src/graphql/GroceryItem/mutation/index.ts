import { gql } from 'apollo-boost';

export const DELETE_GROCERY_ITEM = gql`
mutation deleteGroceryItem($_id: String!) {
  deleteGroceryItem(_id: $_id) {
    _id
  }
}
`;

export const UPDATE_ITEM_NAME = gql`
mutation updateGroceryItemName($_id: String!, $name: String!){
  updateGroceryItemName(_id: $_id, name: $name) {
    _id
    name
    categories {
      name
    }
  }
}
`

export const UNTAG_ITEM = gql`
mutation unTagGroceryItem($_id: String!, $tag: String!){
  unTagGroceryItem(_id: $_id, tag: $tag) {
    _id
    name
    categories {
      name
    }
  }
}
`

export const TAG_ITEM = gql`
mutation tagGroceryItem($_id: String!, $tag: String!){
  tagGroceryItem(_id: $_id, tag: $tag) {
    _id
    name
    categories {
      name
    }
  }
}
`



export const ADD_ITEM = gql`
mutation addGroceryItem($name: String!, $categories: [GroceryCategoryInput]!){
  addGroceryItem(name: $name, categories: $categories) {
    _id
    name
    categories {
      name
    }
  }
}
`
