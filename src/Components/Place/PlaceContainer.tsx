import React from 'react';
import { Mutation } from 'react-apollo';
import { editPlace, editPlaceVariables } from '../../types/api';
import { EDIT_PLACE } from './PlaceQueries';
import { GET_PLACES } from '../../sharedQueries.queries';
import PlacePresenter from './PlacePresenter';
import { useHistory } from 'react-router-dom';

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  id: number;
  key: any;
}

const PlaceContainer: React.FC<IProps> = ({ ...IProps }) => {
  const history = useHistory();
  const clickFn = (e) => {
    e.preventDefault();
    history.push({
      pathname: '/',
      state: {
        toAddress: IProps.address,
      },
    });
  };

  return (
    // <>
    //   <Button
    //     value={IProps.address}
    //     onClick={(e) => {
    //       e.preventDefault();
    //       alert(IProps.address);
    //     }}
    //   ></Button>
    // </>
    <Mutation<editPlace, editPlaceVariables>
      mutation={EDIT_PLACE}
      variables={{ isFav: !IProps.fav, placeId: IProps.id }}
      refetchQueries={[{ query: GET_PLACES }]}
    >
      {(editPlaceFn) => (
        <PlacePresenter
          onClick={clickFn}
          fav={IProps.fav}
          name={IProps.name}
          address={IProps.address}
          onStarPress={editPlaceFn}
        ></PlacePresenter>
      )}
    </Mutation>
  );
};

export default PlaceContainer;
