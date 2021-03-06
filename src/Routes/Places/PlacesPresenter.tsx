import React from 'react';
import { getPlaces } from '../../types/api';
import Place from '../../Components/Place';
import Helmet from 'react-helmet';
import Header from '../../Components/Header';
import styled from '../../typed-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  margin-top: 30px;
  padding: 50px 20px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
`;

const PlaceCont = styled.div`
  margin-bottom: 40px;
`;

const BooleanDiv = styled.div`
  margin-bottom: 40px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
  &:hover {
    color: #fcc159;
  }
`;

interface IProps {
  data?: getPlaces;
  loading: boolean;
}

const PlacePresenter: React.SFC<IProps> = ({
  data: { GetMyPlaces: { places = null } = {} } = {},
  loading,
}) => (
  <React.Fragment>
    <Helmet>
      <title>Places | Number</title>
    </Helmet>
    <Header title={'나의 장소'} backTo={'/'} />
    <Container>
      {!loading && places && places.length === 0 && (
        <BooleanDiv>'등록된 장소가 없습니다.'</BooleanDiv>
      )}
      <PlaceCont>
        {!loading &&
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
      </PlaceCont>
      <SLink to={'/add-place'}>장소를 등록해 주세요</SLink>
    </Container>
  </React.Fragment>
);

export default PlacePresenter;
