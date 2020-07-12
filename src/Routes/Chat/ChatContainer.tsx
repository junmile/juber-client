import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import {
  getChat,
  userProfile,
  sendMessage,
  sendMessageVariables,
  getChatVariables,
} from '../../types/api';
import ChatPresenter from './ChatPresenter';
import { GET_CHAT, SEND_MESSAGE, SUBSCRIBE_TO_MESSAGES } from './ChatQueries';
import { USER_PROFILE } from '../../sharedQueries.queries';
import { SubscribeToMoreOptions } from 'apollo-boost';

import * as Scroll from 'react-scroll';

const ChatContainer: React.FC<any> = (props) => {
  if (!props.match.params.chatId) {
    props.history.push('/');
  }
  const {
    match: {
      params: { chatId },
    },
  } = props;

  const [message, setMessage] = useState<string>('');

  const [enter, setEnter] = useState(0);

  const { data: userData } = useQuery<userProfile>(USER_PROFILE);
  const { data: getChatData, loading, subscribeToMore } = useQuery<
    getChat,
    getChatVariables
  >(GET_CHAT, {
    variables: { type: 'chatId', id: parseInt(chatId, 10) },
  });
  const subscribeToMoreOptions: SubscribeToMoreOptions = {
    document: SUBSCRIBE_TO_MESSAGES,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) {
        return prev;
      }
      const {
        data: { MessageSubscription },
      } = subscriptionData;

      const {
        GetChat: {
          chat: { messages },
        },
      } = prev;

      if (messages && messages.length > 0) {
        const newMessageId = MessageSubscription.id;
        const latestMessage = messages[messages.length - 1].id;
        if (newMessageId === latestMessage) {
          return;
        }
      }

      const newObject = Object.assign({}, prev, {
        GetChat: {
          ...prev.GetChat,
          chat: {
            ...prev.GetChat.chat,
            messages: [
              ...prev.GetChat.chat.messages,
              subscriptionData.data.MessageSubscription,
            ],
          },
        },
      });
      return newObject;
    },
  };

  subscribeToMore(subscribeToMoreOptions);

  const [sendMessageMutation] = useMutation<sendMessage, sendMessageVariables>(
    SEND_MESSAGE
  );
  const conuntEnter = (event) => {
    if (event.keyCode === 13 && message !== '') {
      setEnter(enter + 1);
    }
  };
  useEffect(() => {
    Scroll.animateScroll.scrollToBottom({
      containerId: 'chatBox',
      duration: 200,
    });
  }, [enter]);

  const back = (e) => {
    e.preventDefault();
    const { history } = props;
    history.goBack();
  };

  return (
    <ChatPresenter
      back={back}
      enterFn={conuntEnter}
      data={getChatData}
      loading={loading}
      userData={userData}
      messageText={message}
      onInputChange={setMessage}
      sendMessageFn={sendMessageMutation}
      chatId={chatId}
    />
  );

  // const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
  //   const {
  //     target: { name, value },
  //   } = event;

  //   this.setState({ [name]: value } as any);
  // };

  // const onSubmit = () => {
  //   const { message } = this.state;
  //   console.log('스테이트의 메시지  : ', message);
  //   const {
  //     match: {
  //       params: { chatId },
  //     },
  //   } = this.props;
  //   if (message !== '') {
  //     this.setState({ message: '' });
  //     this.sendMessageFn({
  //       variables: { text: message, chatId: parseInt(chatId, 10) },
  //     });
  //   }
  //   return;
  // };
};

export default ChatContainer;
