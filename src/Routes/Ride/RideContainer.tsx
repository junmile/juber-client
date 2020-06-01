import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import RidePresenter from './RidePresenter';

interface IProps extends RouteComponentProps<any> {}

class RideContainer extends React.Component<IProps> {
  public render() {
<<<<<<< HEAD
    const {
      match: {
        params: { rideId },
      },
    } = this.props;

    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data: userData }) => (
          <RideQuery
            query={GET_RIDE}
            variables={{ rideId: parseInt(rideId, 10) }}
            onCompleted={this.goHome}
          >
            {({ data, loading, subscribeToMore }) => {
              const subscribeOptions: SubscribeToMoreOptions = {
                document: RIDE_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }
                  console.log(prev, subscriptionData);
                },
              };
              subscribeToMore(subscribeOptions);
              return (
                <RideUpdate
                  mutation={UPDATE_RIDE_STATUS}
                  refetchQueries={[
                    {
                      query: GET_RIDE,
                      variables: { rideId: parseInt(rideId, 10) },
                    },
                  ]}
                >
                  {(updateRideFn) => {
                    return (
                      <RidePresenter
                        userData={userData}
                        loading={loading}
                        data={data}
                        updateRideFn={updateRideFn}
                      />
                    );
                  }}
                </RideUpdate>
              );
            }}
          </RideQuery>
        )}
      </ProfileQuery>
    );
=======
    return <RidePresenter />;
>>>>>>> parent of 538ce92... #2.74
  }
  public goHome = (data) => {
    if (data) {
      if (data.GetRide) {
        if (!data.GetRide.ride || data.GetRide.ride.status === 'FINISHED') {
          console.log('라이드에서 홈으로가버려짐');
          const { history } = this.props;
          history.push('/');
        }
      }
    }
  };
}

export default RideContainer;
