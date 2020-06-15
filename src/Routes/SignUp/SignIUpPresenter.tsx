import React from 'react';
import styled from '../../typed-components';

const Container = styled.div``;

interface IProps {
  submitFn: any;
  setFirstName: string;
  setLastName: string;
  setEmail: string;
  setPassword: string;
  setPasswordCheck: string;
  setProfilePhoto: string;
  setAge: number;
  setpPhoneNumber: string;
  setVerifyPhone: boolean;
  setVerifyEmail: boolean;
  setVerifyPassowrd: boolean;
  phoneVerificationFn: any;
}

const SignUpPresenter: React.SFC<IProps> = ({
  submitFn,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setPasswordCheck,
  setProfilePhoto,
  setAge,
  setpPhoneNumber,
  setVerifyPhone,
  setVerifyEmail,
  setVerifyPassowrd,
  phoneVerificationFn,
}) => <Container></Container>;

export default SignUpPresenter;
