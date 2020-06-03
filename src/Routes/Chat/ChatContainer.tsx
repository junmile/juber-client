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
import { GET_CHAT, SEND_MESSAGE } from './ChatQueries';
import { USER_PROFILE } from '../../sharedQueries.queries';

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
            {({ data, loading }) => (
              <SendMessageMutation mutation={SEND_MESSAGE}>
                {(sendMessageFn) => {
                  this.sendMessageFn = sendMessageFn;
                  console.log('데이타 : ', data);
                  console.log('로딩 : ', loading);
                  console.log('유져데이타 : ', userData);
                  console.log('메세지 : ', message);
                  console.log('온인풋첸지 : ', this.onInputChange);
                  console.log('온섭밋 : ', this.onSubmit);
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
            )}
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
