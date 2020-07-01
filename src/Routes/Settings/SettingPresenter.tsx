import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import Place from '../../Components/Place';
import styled from '../../typed-components';
import { getPlaces, userProfile } from '../../types/api';
import basicProfilePhoto from '../../images/basicProfileStart_1.png';
import { toast } from 'react-toastify';

const Container = styled.div`
  margin-top: 30px;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
`;

const Image = styled.img`
  object-fit: cover;
  height: 90px;
  width: 90px;
  border-radius: 50%;
`;

const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
  margin-bottom: 10px;
`;

const Keys = styled.div`
  margin-top: auto;
`;

const Key = styled.span`
  display: block;
  margin-bottom: 5px;
`;

const FakeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const SLink = styled(Link)`
  display: block;
  text-decoration: underline;
  margin: 20px 0px;
`;

interface IProps {
  logUserOut: any;
  userData?: userProfile;
  placesData?: getPlaces;
  userDataLoading: boolean;
  placesLoading: boolean;
}

const SettingsPresenter: React.SFC<IProps> = ({
  logUserOut,
  userData: { GetMyProfile: { user = null } = {} } = {},
  placesData: { GetMyPlaces: { places = null } = {} } = {},
  userDataLoading,
  placesLoading,
}) => (
  <React.Fragment>
    <Helmet>
      <title>Settings | Juber</title>
    </Helmet>
    <Header title={'계정 설정'} backTo={'/'} />
    <Container>
      <GridLink to={'/edit-account'}>
        {!userDataLoading && user && user.email && user.fullName && (
          <React.Fragment>
            {user.profilePhoto && <Image src={user.profilePhoto} />}
            {user.profilePhoto === null && <Image src={basicProfilePhoto} />}
            <Keys>
              <Key>{user.fullName}</Key>
              <Key>{user.email}</Key>
            </Keys>
          </React.Fragment>
        )}
      </GridLink>
      {!placesLoading &&
        places &&
        places.map((place) => (
          <Place
            key={place!.id}
            id={place!.id}
            fav={place!.isFav}
            name={place!.name}
            address={place!.address}
          />
        ))}
      <SLink to={'/places'}>자주가는 주소</SLink>
      <FakeLink
        onClick={() => {
          logUserOut();
          toast.success('로그아웃 되었습니다.');
        }}
      >
        로그아웃
      </FakeLink>
    </Container>
  </React.Fragment>
);

export default SettingsPresenter;
