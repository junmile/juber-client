import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import RidePresenter from './RidePresenter';
import {
  getRide,
  getRideVariables,
  userProfile,
  updateRide,
  updateRideVariables,
} from '../../types/api';
import { Query, Mutation } from 'react-apollo';
import { GET_RIDE, RIDE_SUBSCRIPTION, UPDATE_RIDE_STATUS } from './RideQueries';
import { USER_PROFILE } from '../../sharedQueries.queries';
import { SubscribeToMoreOptions } from 'apollo-boost';

class RideQuery extends Query<getRide, getRideVariables> {}
class ProfileQuery extends Query<userProfile> {}
class RideUpdate extends Mutation<updateRide, updateRideVariables> {}

interface IProps extends RouteComponentProps<any> {}

class RideContainer extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    if (!props.match.params.rideId) {
      props.history.push('/');
    }
  }
  public render() {
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
