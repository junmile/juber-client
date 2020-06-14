import React, { useState } from 'react';
import EmailLoginPresenter from './EmailLoginPresenter';
import { useMutation } from 'react-apollo';
import { emailSiginIn, emailSiginInVariables } from '../../types/api';
import { EMAIL_SIGN_IN } from './EmailLoginQueries';

const EmailLoginContainer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [emailLoginFn] = useMutation<emailSiginIn, emailSiginInVariables>(
    EMAIL_SIGN_IN
  );

  return (
    <EmailLoginPresenter
      emailLoginFn={emailLoginFn}
      emailValue={email}
      onEmailInputChange={setEmail}
      passwordValue={password}
      onPasswordInputChange={setPassword}
    />
  );
};

export default EmailLoginContainer;
