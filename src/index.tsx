// React && 3rd Party
import React from 'react';
import ReactDOM from 'react-dom';
import { typeDefs } from '@testco/graphql/GroceryItem/type'

// TestCo
import App from './App';
import MainProvider from './MainProvider';


/**
 * Entry point of the application.
 */
ReactDOM.render(
  <MainProvider>
    <App />
  </MainProvider>
  ,
  document.querySelector('#root')
);


if (process.env.NODE_ENV === 'development')
  // @ts-ignore
  module.hot.accept();
