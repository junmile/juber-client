import React from 'react';
import Form from '../../Components/Form';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import Message from '../../Components/Message';
import styled from '../../typed-components';
import { getChat, userProfile } from '../../types/api';

const Container = styled.div``;

const Chat = styled.div`
  height: 80vh;
  overflow: scroll;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow: scroll;
`;

const InputCont = styled.div`
  padding: 0 20px;
`;

interface IProps {
  data?: getChat;
  userData?: userProfile;
  loading: boolean;
  messageText: string;
  sendMessageFn: any;
  onInputChange: any;
  chatId: number;
}

const ChatPresenter: React.SFC<IProps> = ({
  loading,
  data: { GetChat: { chat = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  messageText,
  onInputChange,
  sendMessageFn,
  chatId,
}) => (
  <Container>
    <Header title={'JUBER 채팅'} />
    {!loading && chat && user && (
      <React.Fragment>
        <Chat>
          {chat.messages &&
            chat.messages.map((message) => {
              if (message) {
                return (
                  <Message
                    key={message.id}
                    text={message.text}
                    mine={user.id === message.userId}
                  />
                );
              }
              return null;
            })}
        </Chat>
        <InputCont>
          <Form
            submitFn={() => {
              sendMessageFn({
                variables: {
                  text: messageText,
                  chatId: Number(chatId),
                },
              });
              onInputChange('');
            }}
          >
            <Input
              value={messageText}
              placeholder={'메세지를 입력해 주세요.'}
              onChange={(e) => {
                onInputChange(e.target.value);
              }}
              name={'message'}
            />
          </Form>
        </InputCont>
      </React.Fragment>
    )}
  </Container>
);

export default ChatPresenter;
