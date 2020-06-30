import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import {
  startPhoneVerification,
  startPhoneVerificationVariables,
  emailVerification,
  emailVerificationVariables,
  verifyPhone,
  verifyPhoneVariables,
} from '../../types/api';
import { PHONE_SIGN_IN } from '../../Routes/PhoneLogin/PhoneQueries';
import { EMAIL_VERIFICATION, REGISTRATION_CHECK } from './SignUpQueries';
import { LOG_USER_IN } from '../../sharedQueries';
import { toast } from 'react-toastify';
import SignUpPresenter from './SignUpPresenter';
import { VERIFY_PHONE } from '../VerifyPhone/VerifyPhoneQueries';

const SignUpContainer: React.FC = (props: any) => {
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [emailCheck, setEmailCheck] = useState(false);
  // const [password, setPassword] = useState('');
  // const [passwordCheck, setPasswordCheck] = useState('');
  // const [age, setAge] = useState(0);
  // const [phoneNumber, setPhoneNumber] = useState('01047163375');
  // const [verifyPhoneNumber, setVerifyPhoneNumber] = useState(false);
  // const [verifyEmail, setVerifyEmail] = useState(false);
  // const [hidden, setHidden] = useState(false);
  // const [countryCode, setCountryCode] = useState('+82');
  // const [token, setToken] = useState('');

  const [firstName, setFirstName] = useState('승연');
  const [lastName, setLastName] = useState('공');
  const [email, setEmail] = useState('hyolee1003@naver.com');
  const [emailCheck, setEmailCheck] = useState(false);
  const [password, setPassword] = useState('dlwpdksgo3');
  const [passwordCheck, setPasswordCheck] = useState('dlwpdksgo3');
  const [age, setAge] = useState(32);
  const [phoneNumber, setPhoneNumber] = useState('01047163375');
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [countryCode, setCountryCode] = useState('+82');
  const [token, setToken] = useState('');

  const [verifyCode, setVerifyCode] = useState('');

  const [phoneVerificationFn] = useMutation<
    startPhoneVerification,
    startPhoneVerificationVariables
  >(PHONE_SIGN_IN);

  const { data: phoneRegistrationCheckQuery } = useQuery(REGISTRATION_CHECK, {
    variables: { type: 'phone', phoneNumber: `${countryCode}${phoneNumber}` },
  });

  const { data: emailRegistrationCheckQuery } = useQuery(REGISTRATION_CHECK, {
    variables: { type: 'email', email },
  });

  const [logInFn] = useMutation(LOG_USER_IN);

  const [emailSignUpFn] = useMutation<
    emailVerification,
    emailVerificationVariables
  >(EMAIL_VERIFICATION, {
    onCompleted(data) {
      console.log('데이터 : ', data);
      if (data.EmailSignUp) {
        if (data.EmailSignUp.token) {
          logInFn({ variables: { token: data.EmailSignUp.token } });
          const { history } = props;
          history.push('/');
          toast.success('어서오세요. ' + lastName + firstName + '님');
        } else {
          toast.error(data.EmailSignUp.error);
        }
      }
    },
  });

  const [startPhoneVerificationFn] = useMutation<
    startPhoneVerification,
    startPhoneVerificationVariables
  >(PHONE_SIGN_IN);

  const [completePhoneVerificationFn] = useMutation<
    verifyPhone,
    verifyPhoneVariables
  >(VERIFY_PHONE, {
    onCompleted(data) {
      if (data.CompletePhoneVerification.ok) {
        setVerifyPhoneNumber(true);
        toast.success(data.CompletePhoneVerification.error);
      } else {
        toast.error(data.CompletePhoneVerification.error);
      }
    },
  });
  useEffect(() => {
    setEmailCheck(false);
  }, [email]);

  const registrationCheckFn = (type, data) => {
    const date = new Date(Number(data));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getUTCDate();
    const hour = date.getUTCHours();
    let minutes = String(date.getUTCMinutes());
    if (minutes === '0') {
      minutes = '00';
    }
    if (type === 'phone') {
      const messsage =
        '해당 번호로는 이미 ' +
        year +
        '년 ' +
        month +
        '월 ' +
        day +
        '일 ' +
        hour +
        '시 ' +
        minutes +
        '분에 가입 하셨습니다.';
      toast.error(messsage);
    } else {
      const messsage =
        '해당 이메일로는 이미 ' +
        year +
        '년 ' +
        month +
        '월 ' +
        day +
        '일 ' +
        hour +
        '시 ' +
        minutes +
        '분에 가입 하셨습니다.';
      toast.error(messsage);
    }
  };

  const submitFn = async () => {
    console.log(emailCheck);
    console.log(
      ' 섭밋 : ',
      '이름 :',
      firstName,
      '성 :',
      lastName,
      '이멜 :',
      email,

      '비번 :',
      password,
      '나이 :',
      age,
      '번호 :',
      phoneNumber
    );
    if (password === passwordCheck) {
      //id 유효성
      const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailReg.test(String(email).toLowerCase())) {
        toast.error('아이디는 이메일 형식이어야 합니다.');
      }
      if (!emailCheck) {
        toast.error('이메일 중복체크를 해주세요.');
      }

      //비밀번호 유효성
      const passReg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
      if (!passReg.test(password)) {
        toast.error(
          '비밀번호는 6~20글자 사이의 값으로, 최소 한개 이상의 숫자나 특수문자를 포함해야 합니다.'
        );
      }

      //이름 유효성
      const lName = /^[가-힣]{1,2}|[a-zA-Z]{2,10}$/;
      const fName = /^[가-힣]{1,4}|[a-zA-Z]{2,10}$/;
      if (!lName.test(lastName)) {
        toast.error(
          '성에는 1~2글자의 한글혹은 2~10글자의 영문으로만 작성 가능하며,  특수문자나 숫자를 포함할수 없습니다.'
        );
      }

      if (!fName.test(firstName)) {
        toast.error(
          '이름에는 2~4글자의 한글혹은 2~10글자의 영문으로만 작성 가능하며, 특수문자나 숫자를 포함할수 없습니다.'
        );
      }

      if (!verifyPhoneNumber) {
        toast.error('핸드폰 인증을 받아주세요.');
      }

      var ageReg = /^[0-9]*$/;
      if (!ageReg.test(String(age))) {
        toast.error('나이는 숫자만 입력 가능합니다.');
      }

      if (
        firstName !== '' &&
        lastName !== '' &&
        age !== 0 &&
        verifyPhoneNumber &&
        emailCheck
      ) {
        console.log('이메일사인업');
        emailSignUpFn({
          variables: {
            firstName,
            lastName,
            email,
            password,
            age,
            phoneNumber: countryCode + phoneNumber,
          },
        });
      } else {
        toast.error('가입 실패');
      }
    } else {
      toast.error('비밀번호는 동일하게 입력하셔야 합니다.');
      setPassword('');
      setPasswordCheck('');
    }
  };

  const [phoneVerifyFn] = useMutation<
    startPhoneVerification,
    startPhoneVerificationVariables
  >(PHONE_SIGN_IN);

  return (
    <SignUpPresenter
      lastName={lastName}
      firstName={firstName}
      phoneRegistrationCheckQuery={phoneRegistrationCheckQuery}
      emailRegistrationCheckQuery={emailRegistrationCheckQuery}
      phoneVerifyFn={phoneVerifyFn}
      submitFn={submitFn}
      setFirstName={setFirstName}
      setLastName={setLastName}
      email={email}
      setEmail={setEmail}
      setEmailCheck={setEmailCheck}
      password={password}
      setPassword={setPassword}
      passwordCheck={passwordCheck}
      setPasswordCheck={setPasswordCheck}
      age={age}
      setAge={setAge}
      setCountryCode={setCountryCode}
      countryCode={countryCode}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      verifyPhoneNumber={verifyPhoneNumber}
      setVerifyPhone={setVerifyPhoneNumber}
      phoneVerificationFn={phoneVerificationFn}
      setHidden={setHidden}
      hidden={hidden}
      startPhoneVerificationFn={startPhoneVerificationFn}
      token={token}
      setToken={setToken}
      verifyCode={verifyCode}
      setVerifyCode={setVerifyCode}
      completePhoneVerificationFn={completePhoneVerificationFn}
      registrationCheckFn={registrationCheckFn}
    />
  );
};

export default SignUpContainer;
