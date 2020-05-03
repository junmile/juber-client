import React from 'react';
import PlacesPresenter from './PlacesPresenter';
import { getPlaces } from '../../types/api';
import { GET_PLACES } from '../../sharedQueries.queries';
import { Query } from 'react-apollo';

interface IProps {
  data?: getPlaces;
  loading: boolean;
}

class PlaceQuery extends Query<getPlaces> {}

class PlacesContainer extends React.Component {
  public render() {
    return (
      <PlaceQuery query={GET_PLACES}>
        {({ data, loading }) => (
          <PlacesPresenter data={data} loading={loading} />
        )}
      </PlaceQuery>
    );
  }
}

export default PlacesContainer;
