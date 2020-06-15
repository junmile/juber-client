import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import {
  startPhoneVerification,
  startPhoneVerificationVariables,
  emailVerification,
  emailVerificationVariables,
} from '../../types/api';
import { PHONE_SIGN_IN } from '../../Routes/PhoneLogin/PhoneQueries';
import { EMAIL_VERIFICATION } from './SignUpQueries';
import { LOG_USER_IN } from '../../sharedQueries';
import { toast } from 'react-toastify';
import SignUpPresenter from './SignIUpPresenter';

const SignUpContainer: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [phoneNumber, setpPhoneNumber] = useState<string>('');
  const [verifyPhone, setVerifyPhone] = useState<boolean>(false);
  const [verifyEmail, setVerifyEmail] = useState<boolean>(false);
  const [verifyPassword, setVerifyPassowrd] = useState<boolean>(false);

  const [phoneVerificationFn] = useMutation<
    startPhoneVerification,
    startPhoneVerificationVariables
  >(PHONE_SIGN_IN);

  const [logInFn] = useMutation(LOG_USER_IN);

  const [emailSignUpFn] = useMutation<
    emailVerification,
    emailVerificationVariables
  >(EMAIL_VERIFICATION, {
    onCompleted(data) {
      if (data.EmailSignUp) {
        if (data.EmailSignUp.token) {
          logInFn({ variables: { token: data.EmailSignUp.token } });
        } else {
          toast.error(data.EmailSignUp.error);
        }
      }
    },
  });

  const submitFn = () => {
    if (password === passwordCheck) {
      if (verifyPhone && verifyEmail && verifyPassword) {
        emailSignUpFn({
          variables: {
            firstName,
            lastName,
            email,
            password,
            profilePhoto,
            age,
            phoneNumber,
          },
        });
      }
    } else {
      toast.error('비밀번호는 동일하게 입력해야 합니다.');
    }
  };

  return (
    <SignUpPresenter
      submitFn={submitFn}
      setFirstName={setFirstName}
      setLastName={setLastName}
      setEmail={setEmail}
      setPassword={setPassword}
      setPasswordCheck={setPasswordCheck}
      setProfilePhoto={setProfilePhoto}
      setAge={setAge}
      setpPhoneNumber={setpPhoneNumber}
      setVerifyPhone={setVerifyPhone}
      setVerifyEmail={setVerifyEmail}
      setVerifyPassowrd={setVerifyPassowrd}
      phoneVerificationFn={phoneVerificationFn}
    />
  );
};

export default SignUpContainer;
