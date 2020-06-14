import React from 'react';
import { Mutation } from 'react-apollo';
import { editPlace, editPlaceVariables } from '../../types/api';
import { EDIT_PLACE } from './PlaceQueries';
import { GET_PLACES } from '../../sharedQueries.queries';
import PlacePresenter from './PlacePresenter';

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  id: number;
}

class PlaceContainer extends React.Component<IProps> {
  public render() {
    const { fav, name, address, id } = this.props;
    return (
      <Mutation<editPlace, editPlaceVariables>
        mutation={EDIT_PLACE}
        variables={{ isFav: !fav, placeId: id }}
        refetchQueries={[{ query: GET_PLACES }]}
      >
        {(editPlaceFn) => (
          <PlacePresenter
            fav={fav}
            name={name}
            address={address}
            onStarPress={editPlaceFn}
          ></PlacePresenter>
        )}
      </Mutation>
    );
  }
}

export default PlaceContainer;
