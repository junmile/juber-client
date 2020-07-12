import React from 'react';
import Helmet from 'react-helmet';
import Button from '../../Components/Button';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import styled from '../../typed-components';
import Form from '../../Components/App/Form';

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  margin-top: 30px;
  padding: 50px 20px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
  verificationKey: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: any;
  loading: boolean;
}

const VerifyPhonePresenter: React.SFC<IProps> = ({
  verificationKey,
  onChange,
  onSubmit,
  loading,
}) => (
  <Container>
    <Helmet>
      <title>Verify Phone | Number</title>
    </Helmet>
    <Header backTo={'/phone-login'} title={'핸드폰 인증'} />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput
        value={verificationKey}
        placeholder={'핸드폰으로 전송된 코드를 입력해 주세요.'}
        onChange={onChange}
        name={'verificationKey'}
      />
      <Button
        disabled={loading}
        value={loading ? '인증중 입니다.' : '인증완료'}
        onClick={null}
      />
    </ExtendedForm>
  </Container>
);

export default VerifyPhonePresenter;
