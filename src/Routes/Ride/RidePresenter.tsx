import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button';
import styled from '../../typed-components';
import { getRide, userProfile } from '../../types/api';
import basicProfile from '../../images/basicProfile.png';

const Container = styled.div`
  padding: 40px;
`;

const Title = styled.h4`
  font-weight: 800;
  margin-top: 30px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

const Data = styled.span`
  color: ${(props) => props.theme.yellowColor};
`;

const Img = styled.img`
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
  width: 100px;
  height: 100px;
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  margin: 30px 0px;
`;

const ExtendedButton = styled(Button)`
  margin-bottom: 30px;
`;

interface IProps {
  data?: getRide;
  userData?: userProfile;
  loading: boolean;
  updateRideFn: any;
}

const RidePresenter: React.SFC<IProps> = ({
  data: { GetRide: { ride = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  updateRideFn,
}) => (
  <Container>
    {ride && user && (
      <React.Fragment>
        <Title>Passenger</Title>
        <Passenger>
          <Img src={ride.passenger.profilePhoto!} />
          <Data>{ride.passenger.fullName!}</Data>
        </Passenger>
        <Title>Driver</Title>
        {ride.driver && (
          <Passenger>
            <Img src={ride.driver.profilePhoto!} />
            <Data>{ride.driver.fullName!}</Data>
          </Passenger>
        )}
        {!ride.driver && (
          <Passenger>
            <Img src={basicProfile} />
            <Data>요청중입니다..</Data>
          </Passenger>
        )}
        <Title>From</Title>
        <Data>{ride.pickUpAddress}</Data>
        <Title>To</Title>
        <Data>{ride.dropOffAddress}</Data>
        <Title>Price</Title>
        <Data>{ride.price}원</Data>
        <Title>Distance</Title>
        <Data>{ride.distance}</Data>
        <Title>Duration</Title>
        <Data>{ride.duration}</Data>
        <Title>Status</Title>
        <Data>{ride.status}</Data>
        {ride.driver && (
          <Buttons>
            {ride.driver.id === user.id && ride.status === 'ACCEPTED' && (
              <ExtendedButton
                value={'승차'}
                onClick={() =>
                  updateRideFn({
                    variables: {
                      rideId: ride.id,
                      status: 'ONROUTE',
                    },
                  })
                }
              />
            )}
            {ride.driver.id === user.id && ride.status === 'ONROUTE' && (
              <ExtendedButton
                value={'도착완료'}
                onClick={() =>
                  updateRideFn({
                    variables: {
                      rideId: ride.id,
                      status: 'FINISHED',
                    },
                  })
                }
              />
            )}
            {ride.driver.id === user.id ||
              (ride.passenger.id === user.id &&
                ride.status === 'ACCEPTED' &&
                ride.chatId !== null && (
                  <Link to={`/chat/${ride.chatId}`}>
                    <ExtendedButton value={'채팅하기'} onClick={null} />
                  </Link>
                ))}
          </Buttons>
        )}
      </React.Fragment>
    )}
  </Container>
);

export default RidePresenter;
