import React from 'react';
import PhoneLoginPresenter from './PhoneLoginPresenter';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mutation } from 'react-apollo';
import { PHONE_SIGN_IN } from './PhoneQueries.queries';
import {
  startPhoneVerification,
  startPhoneVerificationVariables,
} from '../../types/api';
import { MutationUpdaterFn } from 'apollo-boost';

interface IState {
  countryCode: string;
  phoneNumber: string;
}

class PhonesignInMutation extends Mutation<
  startPhoneVerification,
  startPhoneVerificationVariables
> {}

class PhoneLoginContainer extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  public state = {
    countryCode: '+82',
    phoneNumber: '',
  };

  public render() {
    const { countryCode, phoneNumber } = this.state;
    return (
      <PhonesignInMutation
        mutation={PHONE_SIGN_IN}
        variables={{ phoneNumber: `${countryCode}${phoneNumber}` }}
        update={this.afterSubmit}
      >
        {(mutation, { loading }) => {
          const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
            event.preventDefault();

            const isVaild = /^\+[1-9]{1}[0-9]{7,11}$/.test(
              `${countryCode}${phoneNumber}`
            );
            console.log(isVaild);
            if (isVaild) {
              mutation();
            } else {
              toast.error('전화번호 형식이 맞지 않습니다.');
            }
          };
          return (
            <PhoneLoginPresenter
              countryCode={countryCode}
              phoneNumber={phoneNumber}
              onInputChange={this.onInputChange}
              onSubmit={onSubmit}
              loading={loading}
            />
          );
        }}
      </PhonesignInMutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: value,
    } as any);
  };

  public afterSubmit: MutationUpdaterFn = (cache, data) => {
    console.log(data);
  };
}

export default PhoneLoginContainer;
