import React from 'react';
import styled from '../../typed-components';
import BackArrow from '../BackArrow';

const Container = styled.header`
  background-color: #fcc159;
  margin-bottom: 2px;
  color: white;
  display: flex;
  height: 50px;
  font-size: 20px;
  font-weight: 300;
  align-items: center;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.19), 0 2px 2px rgba(0, 0, 0, 0.23);
  & svg {
    fill: white;
  }
  padding: 0 10px;
`;

const Title = styled.h2`
  margin-left: 10px;
`;

interface IProps {
  title: string;
  backTo?: string;
}

const Header: React.SFC<IProps> = ({ title, backTo }) => (
  <Container>
    {backTo && <BackArrow backTo={backTo} />}
    <Title>{title}</Title>
  </Container>
);

export default Header;
