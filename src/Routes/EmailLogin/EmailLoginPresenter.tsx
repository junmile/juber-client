import Helmet from 'react-helmet';
import React from 'react';
import styled from '../../typed-components';
import Input from '../../Components/Input';
import BackArrow from '../../Components/BackArrow';
import Form from '../../Components/Form';

const Container = styled.div`
  margin-top: 30px;
  padding: 50px 20px;
`;

const InputCont = styled.div``;

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
}

const EmailLoginPresenter: React.SFC<IProps> = ({
  emailValue,
  onEmailInputChange,
  passwordValue,
  onPasswordInputChange,
  emailLoginFn,
}) => (
  <Container>
    <Helmet>
      <title>Email Login | Number</title>
    </Helmet>
    <BackArrowExtended backTo={'/'} />
    <React.Fragment>
      <Title>로그인을 위해 이메일주소를 입력해 주세요.</Title>
      <InputCont>
        <Form
          submitFn={() => {
            console.log('ㄹㄴㅁㅇ항나');
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
            placeholder={'ex) @gamil.com'}
          />
          <Input
            type={'password'}
            name={'password'}
            value={passwordValue}
            onChange={(e) => onPasswordInputChange(e.target.value)}
            placeholder={'password'}
          />
          <HiddenSubmit type={'submit'} />
        </Form>
      </InputCont>
    </React.Fragment>
  </Container>
);

export default EmailLoginPresenter;
