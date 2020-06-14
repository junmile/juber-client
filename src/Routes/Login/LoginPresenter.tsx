import React from 'react';
import Helmet from 'react-helmet';
import { Link, RouteComponentProps } from 'react-router-dom';
import bgImage from '../../images/bgimage.jpg';
import styled from '../../typed-components';

const Container = styled.div`
  height: 100vh;
`;

const Header = styled.header`
  background: #fcc159;
  border-radius: 20px 20px 0 0;
  width: 100%;
  padding: 40px;
  padding-bottom: 30px;
  align-items: center;
  justify-content: center;
  color: white;
  text-weight: bold;
  font-size: 30px;
  text-align: center;
`;

const Title = styled.h1``;

const Footer = styled.div`
  background: white;
  height: 100%;
  border-radius: 0 0 20px 20px;
  padding: 40px;
  padding-top: 30px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
`;

const FakeInput = styled.div`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 300;
`;

const PhoneLogin = styled.div`
  cursor: pointer;
  height: 400px;
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
  background: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Body = styled.div`
  box-shadow: 0 3px 30px rgba(255, 255, 255, 0.55);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  height: 70%;
  width: 400px;
`;

const EmailLogin = styled.div`
  padding: 10px 0px;
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
