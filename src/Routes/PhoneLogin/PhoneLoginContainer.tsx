import React from 'react';
import PhoneLoginPresenter from './PhoneLoginPresenter';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mutation } from 'react-apollo';
import { PHONE_SIGN_IN } from './PhoneQueries';
import {
  startPhoneVerification,
  startPhoneVerificationVariables,
} from '../../types/api';

interface IState {
  countryCode: string;
  phoneNumber: string;
}

class PhoneSignInMutation extends Mutation<
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
    const { history } = this.props;
    const { countryCode, phoneNumber } = this.state;
    return (
      <PhoneSignInMutation
        mutation={PHONE_SIGN_IN}
        variables={{ phoneNumber: `${countryCode}${phoneNumber}` }}
        onCompleted={(data) => {
          const { StartPhoneVerification } = data;
          const phone = `${countryCode}${phoneNumber}`;
          if (StartPhoneVerification.ok) {
            toast.success('문자를 확인해 주세요.');
            setTimeout(() => {
              history.push({
                pathname: '/verify-phone',
                state: {
                  phoneNumber: phone,
                },
              });
            }, 2000);
          } else {
            toast.error(StartPhoneVerification.error);
          }
        }}
      >
        {(mutation, { loading }) => {
          const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
            event.preventDefault();
            const phone = `${countryCode}${phoneNumber}`;
            const isVaild = /^\+[1-9]{1}[0-9]{7,12}$/.test(phone);
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
      </PhoneSignInMutation>
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
}

export default PhoneLoginContainer;
