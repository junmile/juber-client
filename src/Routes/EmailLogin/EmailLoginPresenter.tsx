import Helmet from 'react-helmet';
import React from 'react';
import styled from '../../typed-components';
import Input from '../../Components/Input';
import BackArrow from '../../Components/BackArrow';
import Form from '../../Components/Form';

const Container = styled.div`
  margin-top: 30px;
  padding: 50px 20px;
  width: 100%;
  display: flex;
`;

const InputCont = styled.div`
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
`;

const HiddenSubmit = styled.input`
  display: none;
  font-size: 500px;
`;

const BackArrowExtended = styled(BackArrow)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.yellowColor};
  font-size: 24px;
  margin-bottom: 20px;
`;

interface IProps {
  emailValue: string;
  onEmailInputChange: any;
  passwordValue: string;
  onPasswordInputChange: any;
  emailLoginFn: any;
  logInFn: any;
}

const EmailLoginPresenter: React.SFC<IProps> = ({
  emailValue,
  onEmailInputChange,
  passwordValue,
  onPasswordInputChange,
  emailLoginFn,
  logInFn,
}) => (
  <Container>
    <Helmet>
      <title>Email Login | Number</title>
    </Helmet>
    <BackArrowExtended backTo={'/'} />
    <InputCont>
      <Title>로그인을 위해 이메일주소를 입력해 주세요.</Title>
      <Form
        submitFn={() => {
          emailLoginFn({
            variables: { email: emailValue, password: passwordValue },
          });
        }}
      >
        <Input
          type={'input'}
          name={'email'}
          value={emailValue}
          onChange={(e) => onEmailInputChange(e.target.value)}
          placeholder={'이메일 입력 ex) @gamil.com'}
        />
        <Input
          type={'password'}
          name={'password'}
          value={passwordValue}
          onChange={(e) => onPasswordInputChange(e.target.value)}
          placeholder={'비밀번호'}
        />
        <HiddenSubmit type={'submit'} />
      </Form>
    </InputCont>
  </Container>
);

export default EmailLoginPresenter;
