import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { getPlaces, userProfile } from '../../types/api';
import { LOG_USER_OUT } from '../../sharedQueries';
import { USER_PROFILE, GET_PLACES } from '../../sharedQueries.queries';
import SettingsPresenter from './SettingPresenter';

class SettingsContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {(logUserOut) => (
          <Query<userProfile> query={USER_PROFILE}>
            {({ data: userData, loading: userDataLoading }) => (
              <Query<getPlaces> query={GET_PLACES}>
                {({ data: placesData, loading: placesLoading }) => (
                  <SettingsPresenter
                    userDataLoading={userDataLoading}
                    placesLoading={placesLoading}
                    userData={userData}
                    placesData={placesData}
                    logUserOut={logUserOut}
                  />
                )}
              </Query>
            )}
          </Query>
        )}
      </Mutation>
    );
  }
}

export default SettingsContainer;
