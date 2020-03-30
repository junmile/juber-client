import React from 'react';
import { IS_LOGGED_IN } from './AppQueries';
import { graphql } from 'react-apollo';

const AppContatiner = ({ data }: { data?: any }) => (
  <div>{JSON.stringify(data)}</div>
);

export default graphql(IS_LOGGED_IN)(AppContatiner);
