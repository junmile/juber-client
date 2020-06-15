import React, { useState } from 'react';
import EmailLoginPresenter from './EmailLoginPresenter';
import { useMutation } from 'react-apollo';
import { emailSiginIn, emailSiginInVariables } from '../../types/api';
import { EMAIL_SIGN_IN } from './EmailLoginQueries';
import { LOG_USER_IN } from '../../sharedQueries';
import { toast } from 'react-toastify';

const EmailLoginContainer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userLogInFn] = useMutation(LOG_USER_IN);

  const [emailLoginFn] = useMutation<emailSiginIn, emailSiginInVariables>(
    EMAIL_SIGN_IN,
    {
      onCompleted(data) {
        if (data.EmailSignIn.token) {
          userLogInFn({ variables: { token: data.EmailSignIn.token } });
        } else {
          toast.error(data.EmailSignIn.error);
          setEmail('');
          setPassword('');
        }
      },
    }
  );

  return (
    <EmailLoginPresenter
      logInFn={userLogInFn}
      emailLoginFn={emailLoginFn}
      emailValue={email}
      onEmailInputChange={setEmail}
      passwordValue={password}
      onPasswordInputChange={setPassword}
    />
  );
};

export default EmailLoginContainer;
