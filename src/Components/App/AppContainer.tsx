import React from 'react';
import { IS_LOGGED_IN } from './AppQueries';
import { graphql } from 'react-apollo';
import AppPresenter from './AppPresenter';

const AppContainer = ({ data }: { data?: any }) => (
  <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
);

export default graphql(IS_LOGGED_IN)(AppContainer);
