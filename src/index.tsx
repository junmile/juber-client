import React from 'react';
import ReactDOM from 'react-dom';
import client from './apollo';
import App from './Components/App';
import GlobalStyle from './global-styles';
import { ApolloProvider } from '@apollo/react-hooks';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
    <GlobalStyle />
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
