import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button';
import styled from '../../typed-components';
import { getRide, userProfile } from '../../types/api';
import basicProfile from '../../images/basicProfile.png';
import basicProfileStart from '../../images/basicProfileStart_1.png';
import { toast } from 'react-toastify';

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

const ImfoCont = styled.div`
  margin-bottom: 40px;
`;

interface IProps {
  data?: getRide;
  userData?: userProfile;
  loading: boolean;
  updateRideFn: any;
  goHome: any;
}

const RidePresenter: React.SFC<IProps> = ({
  data: { GetRide: { ride = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  updateRideFn,
  goHome,
}) => (
  <Container>
    {ride && user && (
      <React.Fragment>
        <Title>JUBER 정보</Title>
        <ImfoCont>
          <Title>승객</Title>
          {ride.passenger.profilePhoto && (
            <Passenger>
              <Img src={ride.passenger.profilePhoto!} />
              <Data>{ride.passenger.fullName!}</Data>
            </Passenger>
          )}
          {!ride.passenger.profilePhoto && (
            <Passenger>
              <Img src={basicProfileStart} />
              <Data>{ride.passenger.fullName!}</Data>
            </Passenger>
          )}
          <Title>운전자</Title>
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
          <Title>출발지</Title>
          <Data>{ride.pickUpAddress}</Data>
          <Title>도착지</Title>
          <Data>{ride.dropOffAddress}</Data>
          <Title>가격</Title>
          <Data>{ride.price}원</Data>
          <Title>거리</Title>
          <Data>{ride.distance}</Data>
          <Title>소요시간</Title>
          <Data>{ride.duration}</Data>
          <Title>상태</Title>
          <Data>{ride.status}</Data>
        </ImfoCont>
        {ride.driver && (
          <Buttons>
            {ride.driver.id === user.id && ride.status === 'ACCEPTED' && (
              <ExtendedButton
                value={'탑승 시작'}
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
            {(ride.driver.id === user.id || ride.passenger.id === user.id) &&
              ride.status === 'ACCEPTED' &&
              ride.chatId !== null && (
                <Link to={`/chat/${ride.chatId}`}>
                  <ExtendedButton value={'채팅하기'} onClick={null} />
                </Link>
              )}
          </Buttons>
        )}
        {user.id === ride.passenger.id && ride.status === 'REQUESTING' && (
          <ExtendedButton
            value={'취소하기'}
            onClick={() => {
              updateRideFn({
                variables: {
                  rideId: ride.id,
                  status: 'CANCELED',
                },
              }).then(goHome());
            }}
          />
        )}
      </React.Fragment>
    )}
  </Container>
);

export default RidePresenter;
