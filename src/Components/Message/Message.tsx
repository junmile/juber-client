import React from 'react';
import styled from '../../typed-components';

const Container = styled<any>('div')`
  background-color: ${(props) =>
    props.mine ? props.theme.redColor : props.theme.greenColor};
  color: white;
  max-width: 80%;
  line-height: 22px;
  padding: 20px 20px;
  margin-bottom: 10px;
  border-radius: ${(props) =>
    !props.mine ? '15px 15px 15px 0' : '15px 15px 0 15px'};
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
