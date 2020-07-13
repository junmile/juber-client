import React from 'react';
import { Link } from 'react-router-dom';
import styled from '../../typed-components';
import { userProfile } from '../../types/api';
import basicProfile from '../../images/basicProfileStart_1.png';

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  height: 150px;
  margin-bottom: 30px;
  padding: 0 15px;
  color: white;
`;

const SLink = styled(Link)`
  font-size: 18px;
  display: block;
  margin-left: 30px;
  margin-bottom: 25px;
  font-weight: 400;
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
  background-color: white;
  border-radius: 100px;
  overflow: hidden;
  object-fit: cover;
`;

const Name = styled.h2`
  font-size: 22px;
  margin-top: auto;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Rating = styled.h5`
  font-size: 18px;
  color: ${(props) => props.theme.yellowColor};
`;

const Text = styled.span`
  line-height: 40px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Grid = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  top: 150px;
`;
const Title = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.yellowColor};
  height: 200px;
  text-align: center;
`;

const Juber = styled.div`
  padding-top: 70px;
  font-size: 32px;
  color: white;
`;

const ToggleDriving = styled<any>('button')`
  -webkit-appearance: none;
  background-color: ${(props) =>
    props.isDriving ? props.theme.yellowColor : props.theme.greenColor};
  width: 80%;
  color: white;
  font-size: 18px;
  height: 60px;
  border: 0;
  padding: 15px 0px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  border-radius: 3 px;
  &:hover {
    color: ${(props) =>
      props.isDriving ? props.theme.yellowColor : props.theme.greenColor};
    background-color: white;
    border: 2px solid
      ${(props) =>
        props.isDriving ? props.theme.yellowColor : props.theme.greenColor};
  }
`;

interface IToggleProps {
  isDriving: boolean;
}

interface IProps {
  data?: userProfile;
  loading: boolean;
  toggleDrivingFn: any;
}

const MenuPresenter: React.SFC<IProps> = ({
  data: { GetMyProfile: { user = {} } = {} } = {},
  loading,
  toggleDrivingFn,
}) => (
  <Container>
    {!loading && user && user.fullName && (
      <React.Fragment>
        <Title>
          <Juber>JUBER</Juber>
        </Title>
        <Header>
          <Grid>
            <Link to={'/edit-account'}>
              <Image src={user.profilePhoto || basicProfile} />
            </Link>

            <Text>
              <Name>{user.fullName}</Name>
              <Rating>4.5</Rating>
            </Text>
          </Grid>
        </Header>

        <SLink to="/settings">내 정보</SLink>
        <SLink to="/edit-account">내 정보 변경</SLink>
        <ToggleDriving onClick={toggleDrivingFn} isDriving={user.isDriving}>
          {user.isDriving ? '운전 중지' : '운전 시작'}
        </ToggleDriving>
      </React.Fragment>
    )}
  </Container>
);

export default MenuPresenter;
