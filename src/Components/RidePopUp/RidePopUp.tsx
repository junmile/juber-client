import React from 'react';
import styled from '../../typed-components';
import Button from '../Button';

interface IProps {
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  passengerName: string;
  passengerPhoto: string;
  acceptRideFn: any;
  id: number;
  duration: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 80%;
  height: 80%;
  z-index: 9;
  padding: 20px;
`;

const SubContainer = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
  height: 90%;
  overflow: scroll;
  margin-bottom: 20px;
`;

const Title = styled.div`
  color: ${(props) => props.theme.yellowColor};
  margin-top: 30px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

const Data = styled.span``;

const Img = styled.img`
  border-radius: 50%;
  margin-right: 20px;
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const RidePopUp: React.SFC<IProps> = ({
  pickUpAddress,
  dropOffAddress,
  price,
  distance,
  passengerName,
  passengerPhoto,
  acceptRideFn,
  duration,
  id,
}) => (
  <Container>
    <SubContainer>
      <Title>출발지</Title>
      <Data>{pickUpAddress}</Data>
      <Title>목적지</Title>
      <Data>{dropOffAddress}</Data>
      <Title>가격</Title>
      <Data>{price}원</Data>
      <Title>거리</Title>
      <Data>{distance}</Data>
      <Title>시간</Title>
      <Data>{duration}</Data>
      <Title>Passenger:</Title>
      <Passenger>
        <Img src={passengerPhoto} />
        <Data>{passengerName}</Data>
      </Passenger>
    </SubContainer>
    <Button
      onClick={() => {
        acceptRideFn({ variables: { rideId: id } });
        // crate chat `
      }}
      value={'수락'}
    />
  </Container>
);

export default RidePopUp;
