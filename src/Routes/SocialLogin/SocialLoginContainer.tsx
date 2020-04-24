import React from 'react';
import SocialLoginPresenter from './SocialLoginPresenter';
import { facebookConnect, facebookConnectVariables } from '../../types/api';
import { Mutation } from 'react-apollo';
import { FACEBOOK_CONNECT } from './SocialLoginQueries';
import { RouteComponentProps } from 'react-router-dom';

class LoginMutation extends Mutation<
  facebookConnect,
  facebookConnectVariables
> {}

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  fbId: string;
}

interface IProps extends RouteComponentProps<any> {}

class SocialLoginContainer extends React.Component<IProps, IState> {
  public render() {
    const { firstName, lastName, email, fbId } = this.state;
    return (
      <LoginMutation
        mutation={FACEBOOK_CONNECT}
        variables={{ firstName, lastName, email, fbId }}
      >
        {(facebookConnect, { loading }) => (
          <SocialLoginPresenter loginCallBack={facebookConnect} />
        )}
      </LoginMutation>
    );
  }
}

export default SocialLoginContainer;
