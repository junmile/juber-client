import React from 'react';
import PlacesPresenter from './PlacesPresenter';
import { getPlaces } from '../../types/api';
import { GET_PLACES } from '../../sharedQueries.queries';
import { useQuery } from 'react-apollo';
import { useHistory } from 'react-router-dom';

const PlacesContainer: React.FC = () => {
  const { data, loading } = useQuery<getPlaces>(GET_PLACES);
  const history = useHistory();

  return <PlacesPresenter data={data} loading={loading} />;
};

export default PlacesContainer;
