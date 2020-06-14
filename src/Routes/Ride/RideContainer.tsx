import React from 'react';
import RidePresenter from './RidePresenter';
import {
  getRide,
  getRideVariables,
  userProfile,
  updateRide,
  updateRideVariables,
  getChat,
  getChatVariables,
} from '../../types/api';
import { useQuery, useMutation } from 'react-apollo';
import { GET_RIDE, RIDE_SUBSCRIPTION, UPDATE_RIDE_STATUS } from './RideQueries';
import { USER_PROFILE } from '../../sharedQueries.queries';
import { SubscribeToMoreOptions } from 'apollo-boost';
import { GET_CHAT, SUBSCRIBE_TO_MESSAGES } from '../Chat/ChatQueries';

const RideContainer: React.FC<any> = (props) => {
  const {
    match: {
      params: { rideId },
    },
  } = props;

  console.log(props);

  const { data: getRideQuery, loading, subscribeToMore } = useQuery<
    getRide,
    getRideVariables
  >(GET_RIDE, { variables: { rideId: parseInt(rideId, 10) } });

  const subscribeOptions: SubscribeToMoreOptions = {
    document: RIDE_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) {
        return prev;
      }

      const {
        data: {
          RideStatusSubscription: { status },
        },
      } = subscriptionData;

      if (status === 'FINISHED') {
        window.location.href = '/';
      }
    },
  };

  subscribeToMore(subscribeOptions);

  const { data: chatData } = useQuery<getChat, getChatVariables>(GET_CHAT, {
    variables: { type: 'rideId', id: parseInt(rideId, 10) },
  });

  const { data: userData } = useQuery<userProfile>(USER_PROFILE);
  const [updateRideMutation] = useMutation<updateRide, updateRideVariables>(
    UPDATE_RIDE_STATUS
  );

  return (
    <RidePresenter
      userData={userData}
      loading={loading}
      data={getRideQuery}
      updateRideFn={updateRideMutation}
    />
  );
};

export default RideContainer;
