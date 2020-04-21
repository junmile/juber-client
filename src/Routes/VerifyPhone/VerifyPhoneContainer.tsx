import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import VerifyPhonePresenter from './VerifyPhonePresenter';
import { Mutation } from 'react-apollo';
import { verifyPhone, verifyPhoneVariables } from '../../types/api';
import { VERIFY_PHONE } from './VerifyPhoneQueries';

interface IState {
  key: string;
  phoneNumber: string;
}

interface IProps extends RouteComponentProps<any> {}

class VerifyMutation extends Mutation<verifyPhone, verifyPhoneVariables> {}

class VerifyPhoneContainer extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    if (!props.location.state) {
      props.history.push('/');
    }
    if (props.location.state) {
      this.state = {
        key: '',
        phoneNumber: props.location.state.phoneNumber || '',
      };
    }
  }
  public render() {
    const { key, phoneNumber } = this.state;
    return (
      <VerifyMutation
        mutation={VERIFY_PHONE}
        variables={{
          key,
          phoneNumber,
        }}
      >
        {(mutation, { loading }) => (
          <VerifyPhonePresenter onChange={this.onInputChange} key={key} />
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
