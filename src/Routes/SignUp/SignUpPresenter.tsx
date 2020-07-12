import React from 'react';
import styled from '../../typed-components';
import Input from '../../Components/Input';
import Helmet from 'react-helmet';
import BackArrow from '../../Components/BackArrow';
import Button from '../../Components/Button';
import countries from '../../countries';
import { toast } from 'react-toastify';
const Container = styled.div`
  margin-top: 30px;
  padding: 50px 20px;
`;

const InputCont = styled.div`
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
`;

const BackArrowButton = styled(BackArrow)`
  top: 20px;
  left: 20px;
`;

const First = styled.div``;
const Last = styled.div`
  margin-right: 20px;
`;

const NameInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  > * {
    width: 100%;
    flex-direction: row;
  }
`;
const Title = styled.h2`
  color: ${(props) => props.theme.yellowColor};
  font-size: 25px;
  margin-bottom: 20px;
`;

const Inputs = styled(Input)`
  margin-bottom: 20px;
`;

const Span = styled.span`
  line-height: 40px;
`;

const PhoneVerification = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const VerifyCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Verification = styled(Input)`
  width: 60%;
  margin-right: 20px;
`;

const VerificationButton = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.yellowColor};
  cursor: pointer;
  min-width: 70px;
  width: 30%;
  margin: auto 0;
  text-align: center;
  &:hover {
    color: ${(props) => props.theme.redColor};
  }
`;

const SubmitInput = styled(Button)`
  margin-top: 10px;
`;

const HiddenInput = styled.div``;

const CountrySelect = styled.select`
  font-size: 18px;
  color: '#2c3e50';
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: white;
  border: 0;
  font-family: 'Maven Pro';
  margin-bottom: 20px;
  width: 100%;
`;

const CountryOption = styled.option``;

const EmailInputCont = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;
const EmailCheckButton = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.yellowColor};
  cursor: pointer;
  min-width: 70px;
  width: 30%;
  margin: auto 0;
  text-align: center;
  &:hover {
    color: ${(props) => props.theme.redColor};
  }
`;

const AfterPhoneVerification = styled.div`
  color: ${(porps) => porps.theme.redColor};
  font-weight: bold;
  margin-bottom: 20px;
`;

const AgeCont = styled.div`
  width: 30%;
`;

const AgeInput = styled(Input)``;

interface IProps {
  phoneVerifyFn: any;
  submitFn: any;
  setFirstName: any;
  setLastName: any;
  email: string;
  setEmail: any;
  setEmailCheck: any;
  password: string;
  setPassword: any;
  passwordCheck: string;
  setPasswordCheck: any;
  setAge: any;
  setCountryCode: any;
  countryCode: string;
  phoneNumber: string;
  setPhoneNumber: any;
  verifyPhoneNumber: boolean;
  setVerifyPhone: any;
  phoneVerificationFn: any;
  setHidden: any;
  hidden: boolean;
  startPhoneVerificationFn: any;
  completePhoneVerificationFn: any;
  verifyCode: string;
  setVerifyCode: any;
  emailRegistrationCheckQuery: any;
  phoneRegistrationCheckQuery: any;
  registrationCheckFn: any;
  token: string;
  setToken: any;
  lastName: string;
  firstName: string;
  age: number;
}

const SignUpPresenter: React.SFC<IProps> = ({
  lastName,
  firstName,
  age,
  phoneVerifyFn,
  submitFn,
  setFirstName,
  setLastName,
  email,
  setEmail,
  setEmailCheck,
  password,
  setPassword,
  passwordCheck,
  setPasswordCheck,
  setAge,
  setCountryCode,
  countryCode,
  phoneNumber,
  setPhoneNumber,
  verifyPhoneNumber,
  setVerifyPhone,
  phoneVerificationFn,
  setHidden,
  hidden,
  startPhoneVerificationFn,
  completePhoneVerificationFn,
  verifyCode,
  setVerifyCode,
  emailRegistrationCheckQuery,
  phoneRegistrationCheckQuery,
  registrationCheckFn,
  token,
  setToken,
}) => (
  <Container>
    <Helmet>
      <title>Sign Up | Juber</title>
    </Helmet>
    <InputCont>
      <BackArrowButton backTo={'/'} />
      <Title>JUBER 회원가입</Title>
      <Span>아이디</Span>
      <EmailInputCont>
        <Inputs
          value={email}
          placeholder={'juber@gmail.com'}
          onChange={(e) => setEmail(e.target.value)}
        ></Inputs>
        <EmailCheckButton
          onClick={(e) => {
            e.preventDefault();
            if (emailRegistrationCheckQuery.RegistrationCheck.ok) {
              registrationCheckFn(
                'email',
                emailRegistrationCheckQuery.RegistrationCheck.user.createdAt
              );
              setEmail('');
              return;
            } else {
              toast.success('해당 이메일로 가입 가능 합니다.');
              setEmailCheck(true);
            }
          }}
        >
          중복확인
        </EmailCheckButton>
      </EmailInputCont>
      <Span>비밀번호</Span>
      <Inputs
        type={'password'}
        value={password}
        placeholder={'비밀번호는 6~20글자 내외로 만들어 주세요.'}
        onChange={(e) => setPassword(e.target.value)}
      ></Inputs>
      <Span>비밀번호 확인</Span>
      <Inputs
        type={'password'}
        value={passwordCheck}
        placeholder={'비밀번호를 한번 더 입력해 주세요.'}
        onChange={(e) => setPasswordCheck(e.target.value)}
      ></Inputs>
      <NameInput>
        <Last>
          <Span>성</Span>
          <Inputs
            placeholder={'ex)홍'}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Inputs>
        </Last>
        <First>
          <Span>이름</Span>
          <Inputs
            placeholder={'ex)길동'}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Inputs>
        </First>
      </NameInput>
      <Span>나이</Span>
      <AgeCont>
        <AgeInput
          placeholder={'ex)32'}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        ></AgeInput>
      </AgeCont>
      {!hidden && !verifyPhoneNumber && (
        <PhoneVerification>
          <Span>핸드폰번호</Span>
          <CountrySelect
            value={countryCode}
            name={'countryCode'}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            {countries.map((country, index) => (
              <CountryOption key={index} value={country.dial_code}>
                {country.flag} {country.name} ({country.dial_code})
              </CountryOption>
            ))}
          </CountrySelect>
          <VerifyCont>
            <Verification
              placeholder={'ex)01012345678'}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <VerificationButton
              onClick={(e) => {
                e.preventDefault();
                //만약 가입이되어있는유져라면 인증절차거치지않고 알려줌
                if (phoneRegistrationCheckQuery.RegistrationCheck.ok) {
                  registrationCheckFn(
                    'phone',
                    phoneRegistrationCheckQuery.RegistrationCheck.user.createdAt
                  );
                  setPhoneNumber('');
                  return;
                }
                if (phoneNumber !== '') {
                  //가입되어있지않다면 인증절차 시작
                  const pnum = `${countryCode}${phoneNumber}`;
                  startPhoneVerificationFn({
                    variables: { phoneNumber: pnum },
                  });
                  setHidden(true);
                } else {
                  toast.error('핸드폰번호를 입력해 주세요.');
                }
              }}
            >
              문자확인
            </VerificationButton>
          </VerifyCont>
        </PhoneVerification>
      )}
      {hidden && token === '' && !verifyPhoneNumber && (
        <HiddenInput>
          <Span>핸드폰번호</Span>
          <VerifyCont>
            <Verification
              placeholder={'전송된 문자를 확인 후 인증번호를 기입해 주세요.'}
              onChange={(e) => setVerifyCode(e.target.value)}
            />
            <VerificationButton
              onClick={(e) => {
                e.preventDefault();
                completePhoneVerificationFn({
                  variables: {
                    key: verifyCode,
                    phoneNumber: `${countryCode}${phoneNumber}`,
                  },
                });
              }}
            >
              인증완료
            </VerificationButton>
          </VerifyCont>
        </HiddenInput>
      )}
      {hidden && token === '' && verifyPhoneNumber && (
        <AfterPhoneVerification>인증완료 되었습니다.</AfterPhoneVerification>
      )}

      <SubmitInput
        type={'submit'}
        value={'가입'}
        onClick={(e) => {
          submitFn();
        }}
      ></SubmitInput>
    </InputCont>
  </Container>
);

export default SignUpPresenter;
