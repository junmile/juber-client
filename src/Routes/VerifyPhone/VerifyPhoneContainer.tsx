import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import VerifyPhonePresenter from './VerifyPhonePresenter';
import { Mutation } from 'react-apollo';
import { verifyPhone, verifyPhoneVariables } from '../../types/api';
import { VERIFY_PHONE } from './VerifyPhoneQueries';
import { toast } from 'react-toastify';

interface IState {
  verificationKey: string;
  phoneNumber: string;
}

interface IProps extends RouteComponentProps<any> {}

class VerifyMutation extends Mutation<verifyPhone, verifyPhoneVariables> {}

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
      };
    }
  }
  public render() {
    const { verificationKey, phoneNumber } = this.state;
    return (
      <VerifyMutation
        mutation={VERIFY_PHONE}
        variables={{
          key: verificationKey,
          phoneNumber,
        }}
        onCompleted={(data) => {
          const { CompletePhoneVerification } = data;
          if (CompletePhoneVerification.ok) {
            return;
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
      </VerifyMutation>
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

export default VerifyPhoneContainer;
