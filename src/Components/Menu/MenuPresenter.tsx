import React from 'react';
import { Link } from 'react-router-dom';
import styled from '../../typed-components';
import { userProfile } from '../../types/api';

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  height: 20%;
  margin-bottom: 30px;
  padding: 0 15px;
  color: white;
`;

const SLink = styled(Link)`
  font-size: 22px;
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-weight: 400;
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
  background-color: grey;
  border-radius: 100px;
  overflow: hidden;
  object-fit: cover;
`;

const Name = styled.h2`
  font-size: 22px;
  margin-top: auto;
  color: black;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Rating = styled.h5`
  font-size: 18px;
  color: white;
`;

const Text = styled.span`
  margin-top: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
  height: 100%;
  align-items: center;
`;

interface IToggleProps {
  isDriving: boolean;
}

const ToggleDriving = styled<IToggleProps, any>('button')`
  -webkit-appearance: none;
  background-color: ${(props) =>
    props.isDriving ? props.theme.yellowColor : props.theme.greenColor};
  width: 100%;
  color: white;
  font-size: 18px;
  border: 0;
  padding: 15px 0px;
  cursor: pointer;
`;

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
        <Header>
          <Grid>
            <Link to={'/edit-account'}>
              <Image
                src={
                  user.profilePhoto ||
                  'https://lh3.googleusercontent.com/-CTwXMuZRaWw/AAAAAAAAAAI/AAAAAAAAAUg/8T5nFuIdnHE/photo.jpg'
                }
              />
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
          {user.isDriving ? 'Stop driving' : 'Start driving'}
        </ToggleDriving>
      </React.Fragment>
    )}
  </Container>
);

export default MenuPresenter;
