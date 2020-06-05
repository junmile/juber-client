import React from 'react';
import { graphql } from 'react-apollo';
import theme from '../../theme';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '../../typed-components';
import AppPresenter from './AppPresenter';
import { IS_LOGGED_IN } from './AppQueries';

const AppContainer = ({ data }: { data?: any }) => (
  <>
    <ThemeProvider theme={theme}>
      <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
    </ThemeProvider>
    <ToastContainer draggable={true} position={'bottom-center'} />
  </>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
