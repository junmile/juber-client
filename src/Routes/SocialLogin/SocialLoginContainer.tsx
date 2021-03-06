import React from 'react';
import { Mutation } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LOG_USER_IN } from '../../sharedQueries';
import { facebookConnect, facebookConnectVariables } from '../../types/api';
import SocialLoginPresenter from './SocialLoginPresenter';
import { FACEBOOK_CONNECT } from './SocialLoginQueries';

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  fbId: string;
}

interface IProps extends RouteComponentProps<any> {}

class SocialLoginContainer extends React.Component<IProps, IState> {
  public state = {
    email: '',
    fbId: '',
    firstName: '',
    lastName: '',
  };
  //facebookMutation은 MutationFn이며 response는 facebookConnect variables는 facebookConnectVariables타입을 참조함
  public facebookMutation: any | undefined = undefined;

  public render() {
    return (
      <Mutation mutation={LOG_USER_IN}>
        {(logUserIn) => (
          //mutation logUserIn($token: String!) { logUserIn(token: $token) @client}
          // logUserIn Mutation은 token값을 variables로 요구한다.
          <Mutation<facebookConnect, facebookConnectVariables>
            mutation={FACEBOOK_CONNECT}
            //facebookConnect의 리턴값
            onCompleted={(data) => {
              const { FacebookConnect } = data;
              if (FacebookConnect.ok) {
                //logUserIn의 Mutation으로 token값을 반환한다.
                logUserIn({
                  variables: {
                    token: FacebookConnect.token,
                  },
                });
              } else {
                toast.error(FacebookConnect.error);
              }
            }}
          >
            {(facebookMutation, { loading }) => {
              this.facebookMutation = facebookMutation;
              return (
                <SocialLoginPresenter loginCallback={this.loginCallback} />
              );
            }}
          </Mutation>
        )}
      </Mutation>
    );
  }

  public loginCallback = (response) => {
    const { name, first_name, last_name, id, accessToken, email } = response;
    if (accessToken) {
      toast.success(`Welcome ${name}`);
      if (this.facebookMutation) {
        this.facebookMutation({
          variables: {
            firstName: first_name,
            lastName: last_name,
            fbId: id,
            email,
          },
        });
      }
    } else {
      toast.error('Cound not log you in 😔');
    }
  };
}

export default SocialLoginContainer;
