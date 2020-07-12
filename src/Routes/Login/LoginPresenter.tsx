import React from 'react';
import Helmet from 'react-helmet';
import { Link, RouteComponentProps } from 'react-router-dom';
// import bgImage from '../../images/bgimage.jpg';
import styled from '../../typed-components';

const Container = styled.div`
  height: 100vh;
`;

const Header = styled.header`
  background: #fcc159;
  width: 100%;
  padding-bottom: 30px;
  color: white;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.yellowColor};
  width: 140px;
  height: 200px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  background-color: white;
`;

const Footer = styled.div`
  background: white;
  height: 50%;
  padding: 40px;
  padding-top: 30px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
`;

const FakeInput = styled.div`
  margin: 50px 0px;
  font-size: 18px;
  font-weight: 300;
`;

const PhoneLogin = styled.div`
  cursor: pointer;
  height: 150px;
`;

const Grey = styled.span`
  color: ${(props) => props.theme.greyColor};
  margin-left: 10px;
`;

const SocialLogin = styled.div`
  padding: 10px 0px;
`;

const SocialLink = styled.span`
  color: ${(props) => props.theme.blueColor};
  font-size: 16px;
  cursor: pointer;
`;

const EmailLink = styled.span`
  color: ${(props) => props.theme.blueColor};
  font-size: 16px;
  cursor: pointer;
`;

const Background = styled.div`
  color: #4a4a4a;
  height: 100%;
  background-color: white;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Body = styled.div`
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const EmailLogin = styled.div`
  padding: 10px 0px;
`;
const SignUpLink = styled.span`
  > * {
    color: ${(props) => props.theme.blueColor};
    font-weight: bold;
  }
`;

const SignUp = styled.div`
  padding: 10px 0;
  margin-bottom: 40px;
  font-size: 16px;
`;

interface IProps extends RouteComponentProps<any> {}

const OutHomePresenter: React.SFC<IProps> = () => (
  <Container>
    <Background>
      <Body>
        <Helmet>
          <title>Login | Juber</title>
        </Helmet>
        <Header>
          <Title>JUBER</Title>
        </Header>
        <Footer>
          <Link to={'/phone-login'}>
            <PhoneLogin>
              <Subtitle>JUBER와 함께하세요</Subtitle>
              <FakeInput>
                <span role="img" aria-label="">
                  🇰🇷 +82
                </span>
                <Grey>핸드폰 번호를 입력하세요.</Grey>
              </FakeInput>
            </PhoneLogin>
          </Link>
          <SignUp>
            <SignUpLink>
              회원이 아니신가요?
              <Link to={'/sign-up'}> 가입하기</Link>
            </SignUpLink>
          </SignUp>
          <Link to={'/email-login'}>
            <EmailLogin>
              <EmailLink>기존 이메일로 로그인</EmailLink>
            </EmailLogin>
          </Link>
          <Link to={'/social-login'}>
            <SocialLogin>
              <SocialLink>페이스북으로 로그인</SocialLink>
            </SocialLogin>
          </Link>
        </Footer>
      </Body>
    </Background>
  </Container>
);

export default OutHomePresenter;
