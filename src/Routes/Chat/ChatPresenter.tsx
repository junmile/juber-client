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
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow: scroll;
  padding-bottom: 80px;
`;

const HiddenDiv = styled.div``;

const CloseCont = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  flex-direction: row;
  top: 0;
  right: 20px;
`;

const CloseButton = styled.div`
  margin-top: 20px;
  margin-left: auto;
  color: white;
  text-align: end;
  &:hover {
    color: red;
  }
  cursor: pointer;
`;

const InputCont = styled.div`
  padding: 0 20px;
`;

interface IProps {
  enterFn: any;
  data?: getChat;
  userData?: userProfile;
  loading: boolean;
  messageText: string;
  sendMessageFn: any;
  onInputChange: any;
  chatId: number;
  back: any;
}

const ChatPresenter: React.SFC<IProps> = ({
  enterFn,
  loading,
  data: { GetChat: { chat = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  messageText,
  onInputChange,
  sendMessageFn,
  chatId,
  back,
}) => (
  <Container>
    <Header title={'JUBER 채팅'} />
    <CloseCont>
      <CloseButton onClick={back}>닫기</CloseButton>
    </CloseCont>
    {!loading && chat && user && (
      <React.Fragment>
        <Chat id={'chatBox'}>
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
        <HiddenDiv id={'hide'} />
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
              enter={enterFn}
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
