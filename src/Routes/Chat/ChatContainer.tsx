import React from 'react';
import { Query, Mutation, MutationFn } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import {
  getChat,
  getChatVariables,
  userProfile,
  sendMessage,
  sendMessageVariables,
} from '../../types/api';
import ChatPresenter from './ChatPresenter';
import { GET_CHAT, SEND_MESSAGE, SUBSCRIBE_TO_MESSAGES } from './ChatQueries';
import { USER_PROFILE } from '../../sharedQueries.queries';
import { SubscribeToMoreOptions } from 'apollo-boost';

interface IProps extends RouteComponentProps<any> {}
interface IState {
  message: '';
}

class ProfileQuery extends Query<userProfile> {}
class ChatQuery extends Query<getChat, getChatVariables> {}
class SendMessageMutation extends Mutation<sendMessage, sendMessageVariables> {}

class ChatContainer extends React.Component<IProps, IState> {
  public sendMessageFn: MutationFn<sendMessage, sendMessageVariables>;

  constructor(props: IProps) {
    super(props);
    if (!props.match.params.chatId) {
      props.history.push('/');
    }
    this.state = { message: '' };
  }
  public render() {
    const {
      match: {
        params: { chatId },
      },
    } = this.props;
    const { message } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data: userData }) => (
          <ChatQuery
            query={GET_CHAT}
            variables={{ chatId: parseInt(chatId, 10) }}
          >
            {({ data, loading, subscribeToMore }) => {
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

                  const newMessageId = MessageSubscription.id;
                  const latestMessage = messages[messages.length - 1].id;

                  if (newMessageId === latestMessage) {
                    return;
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
                  console.log('프리뷰 : ', prev);
                  console.log('뉴옵젝: ', newObject);
                  return newObject;
                },
              };
              subscribeToMore(subscribeToMoreOptions);
              return (
                <SendMessageMutation mutation={SEND_MESSAGE}>
                  {(sendMessageFn) => {
                    this.sendMessageFn = sendMessageFn;
                    return (
                      <ChatPresenter
                        data={data}
                        loading={loading}
                        userData={userData}
                        messageText={message}
                        onInputChange={this.onInputChange}
                        onSubmit={this.onSubmit}
                      />
                    );
                  }}
                </SendMessageMutation>
              );
            }}
          </ChatQuery>
        )}
      </ProfileQuery>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const {
      target: { name, value },
    } = event;

    this.setState({ [name]: value } as any);
  };

  public onSubmit = () => {
    const { message } = this.state;
    const {
      match: {
        params: { chatId },
      },
    } = this.props;
    if (message !== '') {
      this.setState({ message: '' });
      this.sendMessageFn({
        variables: { text: message, chatId: parseInt(chatId, 10) },
      });
    }
    return;
  };
}

export default ChatContainer;
