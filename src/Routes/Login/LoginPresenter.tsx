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
  padding: 30px 20px;
`;

const SocialLink = styled.span`
  color: ${(props) => props.theme.blueColor};
  font-size: 20px;
  cursor: pointer;
`;
const Background = styled.div`
  color: #4a4a4a;
  height: 100%;
  background: url(${bgImage}) no-repeat;
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
              <Subtitle>Get moving with Juber</Subtitle>
              <FakeInput>
                🇰🇷 +82 <Grey>Enter your mobile number</Grey>
              </FakeInput>
            </PhoneLogin>
          </Link>
          <Link to={'/social-login'}>
            <SocialLogin>
              <SocialLink>Or connect with social</SocialLink>
            </SocialLogin>
          </Link>
        </Footer>
      </Body>
    </Background>
  </Container>
);

export default OutHomePresenter;
