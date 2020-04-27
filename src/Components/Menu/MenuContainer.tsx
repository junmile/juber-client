import React from 'react';
import MenuPresenter from './MenuPresenter';
import { Query, Mutation } from 'react-apollo';
import { userProfile, toggleDriving } from '../../types/api';
import { USER_PROFILE } from '../../sharedQueries.queries';
import TOGGLE_DRIVING from './MenuQueries';
import { toast } from 'react-toastify';

class ProfileQuery extends Query<userProfile> {}

class ToggleDrivingMutation extends Mutation<toggleDriving> {}

class MenuContainer extends React.Component {
  public render() {
    return (
      <ToggleDrivingMutation
        mutation={TOGGLE_DRIVING}
        // refetchQueries={[{ query: USER_PROFILE }]}
        update={(cache, { data }) => {
          if (data) {
            const { ToggleDrivingMode } = data;
            if (!ToggleDrivingMode.ok) {
              toast.error('상태를 바꿀수 없습니다.');
              return;
            }
            const query: userProfile | null = cache.readQuery({
              query: USER_PROFILE,
            });
            if (query) {
              const {
                GetMyProfile: { user },
              } = query;
              if (user) {
                user.isDriving = !user.isDriving;
              }
            }
            cache.writeQuery({ query: USER_PROFILE, data: query });
          }
        }}
      >
        {(toggleDrivingFn) => (
          <ProfileQuery query={USER_PROFILE}>
            {({ data, loading }) => (
              <MenuPresenter
                data={data}
                loading={loading}
                toggleDrivingFn={toggleDrivingFn}
              />
            )}
          </ProfileQuery>
        )}
      </ToggleDrivingMutation>
    );
  }
}

export default MenuContainer;
