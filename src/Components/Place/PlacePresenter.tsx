import React from 'react';
import styled from '../../typed-components';
import heart2 from '../../images/heart2.png';
import heart1 from '../../images/heart1.png';

const Place = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  & i {
    font-size: 12px;
  }
`;

const Container = styled.div`
  margin-left: 10px;
`;

const Name = styled.span`
  display: block;
`;

const Icon = styled.span`
  cursor: pointer;
`;
const Heart = styled.img`
  width: 20px;
`;

const Address = styled.span`
  color: ${(props) => props.theme.greyColor};
  font-size: 14px;
`;

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  onStarPress: any;
}

const PlacePresenter: React.SFC<IProps> = ({
  onStarPress,
  fav,
  name,
  address,
}) => (
  <Place>
    <Icon onClick={onStarPress as any}>
      {fav ? <Heart src={heart1} /> : <Heart src={heart2} />}
    </Icon>
    <Container>
      <Name>{name}</Name>
      <Address>{address}</Address>
    </Container>
  </Place>
);

export default PlacePresenter;
