import React from 'react';
import styled from '../../typed-components';
import { getRide } from '../../types/api';

const Container = styled.div``;

interface IProps {
  data?: getRide;
}

<<<<<<< HEAD
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
        {ride.driver && (
          <React.Fragment>
            <Title>Driver</Title>
            <Passenger>
              <Img src={ride.driver.profilePhoto} />
              <Data>{ride.driver.fullName}</Data>
            </Passenger>
          </React.Fragment>
        )}
        <Title>From</Title>
        <Data>{ride.pickUpAddress}</Data>
        <Title>To</Title>
        <Data>{ride.dropOffAddress}</Data>
        <Title>Price</Title>
        <Data>{ride.price}</Data>
        <Title>Distance</Title>
        <Data>{ride.distance}</Data>
        <Title>Duration</Title>
        <Data>{ride.duration}</Data>
        <Title>Status</Title>
        <Data>{ride.status}</Data>
        <Buttons>
          {ride.driver.id === user.id && ride.status === 'ACCEPTED' && (
            <ExtendedButton
              value={'Picked Up'}
              onClick={() =>
                updateRideFn({
                  variables: {
                    rideId: ride.id,
                    status: StatusOptions.ONROUTE,
                  },
                })
              }
            />
          )}
          {ride.driver.id === user.id && ride.status === 'ONROUTE' && (
            <ExtendedButton
              value={'Finished'}
              onClick={() =>
                updateRideFn({
                  variables: {
                    rideId: ride.id,
                    status: StatusOptions.FINISHED,
                  },
                })
              }
            />
          )}
          {ride.driver.id === user.id ||
            (ride.passenger.id === user.id && ride.status === 'ACCEPTED' && (
              <Link to={`/chat/${ride.chatId}`}>
                <ExtendedButton value={'Chat'} onClick={null} />
              </Link>
            ))}
        </Buttons>
      </React.Fragment>
    )}
  </Container>
);
=======
const RidePresenter: React.SFC<IProps> = () => <Container>Ride</Container>;
>>>>>>> parent of 538ce92... #2.74

export default RidePresenter;
