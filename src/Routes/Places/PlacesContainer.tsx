import React from 'react';
import PlacesPresenter from './PlacesPresenter';
import { getPlaces } from '../../types/api';
import { GET_PLACES } from '../../sharedQueries.queries';
import { useQuery } from 'react-apollo';

const PlacesContainer: React.FC = () => {
  const { data, loading } = useQuery<getPlaces>(GET_PLACES);

  return <PlacesPresenter data={data} loading={loading} />;
};

export default PlacesContainer;
