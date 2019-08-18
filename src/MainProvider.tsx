// React && 3rd Party
import React from 'react';
import { typeDefs } from '@testco/graphql/GroceryItem/type'


import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  typeDefs,
});



/**
 * Place all necessary Providers here.
 */
const MainProvider: React.FC<{}> = (props) => {
  return <ApolloProvider client={client}>
    {props.children}
  </ApolloProvider>
}

export default MainProvider;
