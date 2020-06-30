import React from 'react';
import styled from '../../../typed-components';

const Container = styled.input`
  position: absolute;
  background-color: white;
  border-radius: 5px;
  -webkit-appearance: none;
  z-index: 5;
  width: 80%;
  border: 0;
  font-size: 16px;
  padding: 15px 10px;
  box-shadow: 0 18px 35px rgba(50, 50, 93, 0.1), 0 8px 15px rgba(0, 0, 0, 0.07);
  margin: auto;
  top: 10px;
  left: 0;
  right: 0;
  height: auto;
`;

interface IProps {
  value: string;
  onBlur: any;
  name: string;
  enter: any;
  onChangeFn: any;
}

const AddressBar: React.SFC<IProps> = ({
  value,
  onBlur,
  onChangeFn,
  name,
  enter,
}) => (
  <Container
    onKeyDown={enter}
    value={value}
    onBlur={onBlur}
    onChange={(e) => onChangeFn(e.target.value)}
    onSubmit={onBlur}
    placeholder={'목적지를 검색해 주세요.'}
    name={name}
  />
);

export default AddressBar;
