import React from 'react';
import styled from '../../typed-components';

const Container = styled<{ mine: boolean }, any>('div')`
  background-color: ${(props) =>
    props.mine ? props.theme.redColor : props.theme.greenColor};
  color: white;
  max-width: 80%;
  line-height: 22px;
  padding: 20px 20px;
  margin-bottom: 10px;
  border-radius: ${(props) =>
    !props.mine ? '10px 10px 10px 0' : '10px 10px 0 10px'};
  align-self: ${(props) => (props.mine ? 'flex-end' : 'flex-start')};
`;

interface IProps {
  text: string;
  mine: boolean;
}

const Message: React.SFC<IProps> = ({ text, mine }) => (
  <Container mine={mine}>{text}</Container>
);

export default Message;
