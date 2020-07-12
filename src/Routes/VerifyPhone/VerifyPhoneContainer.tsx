import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import VerifyPhonePresenter from './VerifyPhonePresenter';
import { graphql, Mutation } from 'react-apollo';
import { verifyPhone, verifyPhoneVariables } from '../../types/api';
import { VERIFY_PHONE } from './VerifyPhoneQueries';
import { toast } from 'react-toastify';
import { LOG_USER_IN } from '../../sharedQueries';

interface IState {
  verificationKey: string;
  phoneNumber: string;
  countryCode: string;
}

interface IProps extends RouteComponentProps<any> {
  logUserIn: any;
}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push('/');
    }
    if (props.location.state) {
      this.state = {
        verificationKey: '',
        phoneNumber: props.location.state.phoneNumber || '',
        countryCode: props.location.state.countryCode || '',
      };
    }
  }

  public render() {
    const { verificationKey, phoneNumber, countryCode } = this.state;
    return (
      <Mutation mutation={LOG_USER_IN}>
        {(logUserIn) => (
          <Mutation<verifyPhone, verifyPhoneVariables>
            mutation={VERIFY_PHONE}
            variables={{
              key: verificationKey,
              phoneNumber: countryCode + phoneNumber,
            }}
            onCompleted={(data) => {
              const { CompletePhoneVerification } = data;
              const { history } = this.props;
              if (CompletePhoneVerification.ok) {
                if (CompletePhoneVerification.token) {
                  logUserIn({
                    variables: {
                      token: CompletePhoneVerification.token,
                    },
                  });
                  toast.success('확인되었습니다. 로그인 되었습니다.');
                } else {
                  toast.error('가입된 정보가 없습니다. 회원가입을 해주세요.');
                  history.push({
                    pathname: '/sign-up',
                    state: {
                      token: CompletePhoneVerification.token,
                      verifyPhoneNumber: true,
                      phoneNumber,
                      countryCode,
                    },
                  });
                }
              } else {
                toast.error(CompletePhoneVerification.error);
              }
            }}
          >
            {(mutation, { loading }) => (
              <VerifyPhonePresenter
                onSubmit={mutation}
                onChange={this.onInputChange}
                verificationKey={verificationKey}
                loading={loading}
              />
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: value,
    } as any);
  };
}

export default graphql<any, any>(LOG_USER_IN, {
  name: 'logUserIn',
})(VerifyPhoneContainer);
