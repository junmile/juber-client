import React from 'react';
import styled from '../../typed-components';

const Container = styled.input`
  border-style: none;
  box-shadow: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12),
    inset 0 1px 2px rgba(0, 0, 0, 0.24);
  font-size: 16px;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  font-weight: 500;
  transition: border-bottom 0.1s linear;
  border-radius: 5px;
  background-color: rgb(232, 240, 254);

  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset !important;
  }
  &:focus {
    border-bottom-color: #2c3e50;
    outline: none;
  }
  &::placeholder {
    color: ${(props) => props.theme.greyColor};
    font-weight: 300;
  }
`;

interface IProps {
  placeholder?: string;
  type?: string;
  required?: boolean;
  value?: string;
  name?: string;
  onChange?: any;
}

const Input: React.SFC<IProps> = ({
  placeholder = '',
  type = 'text',
  required = true,
  value,
  name = '',
  onChange,
}) => (
  <Container
    name={name}
    type={type}
    required={required}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
  />
);

export default Input;
