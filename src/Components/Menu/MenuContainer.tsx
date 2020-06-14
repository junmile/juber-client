import React from 'react';
import MenuPresenter from './MenuPresenter';
import { useMutation, useQuery } from 'react-apollo';
import {
  userProfile,
  toggleDriving,
  getRide,
  getNearbyDrivers,
  getNearbyRides,
} from '../../types/api';
import { USER_PROFILE } from '../../sharedQueries.queries';
import TOGGLE_DRIVING from './MenuQueries';
import { toast } from 'react-toastify';
import { GET_RIDE } from '../../Routes/Ride/RideQueries';
import {
  GET_NEARBY_DRIVERS,
  GET_NEARBY_RIDE,
} from '../../Routes/Home/HomeQueries';

const MenuContainer: React.FC = () => {
  const [toggleDrivingMutation] = useMutation<toggleDriving>(TOGGLE_DRIVING, {
    update(cache, { data }) {
      if (data) {
        console.log('캐시 :', cache);
        const { ToggleDrivingMode } = data;
        if (!ToggleDrivingMode.ok) {
          toast.error('상태를 바꿀수 없습니다.');
          return;
        }
        const query: userProfile | null = cache.readQuery({
          query: USER_PROFILE,
        });

        const rideQuery: getNearbyRides | null = cache.readQuery({
          query: GET_NEARBY_RIDE,
        });

        const driverQuery: getNearbyDrivers | null = cache.readQuery({
          query: GET_NEARBY_DRIVERS,
        });

        if (query) {
          const {
            GetMyProfile: { user },
          } = query;
          if (user) {
            user.isDriving = !user.isDriving;
          }
        }
        cache.writeQuery({ query: GET_NEARBY_RIDE, data: rideQuery });
        cache.writeQuery({ query: GET_NEARBY_DRIVERS, data: driverQuery });

        cache.writeQuery({ query: USER_PROFILE, data: query });
      }
    },
  });

  const { data: userProfileQuery, loading } = useQuery<userProfile>(
    USER_PROFILE
  );

  return (
    <MenuPresenter
      data={userProfileQuery}
      loading={loading}
      toggleDrivingFn={toggleDrivingMutation}
    />
  );
};

export default MenuContainer;
