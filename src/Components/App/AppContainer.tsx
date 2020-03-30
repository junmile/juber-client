import React from 'react';
import { IS_LOGGED_IN } from './AppQueries';
import reset from 'styled-reset';
import { graphql } from 'react-apollo';
import AppPresenter from './AppPresenter';
import { createGlobalStyle, ThemeProvider } from '../../typed-components';
import theme from '../../theme';


const GlobalStyle = createGlobalStyle`${reset}`;

const AppContainer = ({ data }: { data?: any }) => (
  <GlobalStyle/>
  <ThemeProvider theme={theme}>
    <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
  </ThemeProvider>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
