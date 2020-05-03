import React from 'react';
import AddPlacePresenter from './AddPlacePresenter';
import { RouteComponentProps } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { addPlace, addPlaceVariables } from '../../types/api';
import { ADD_PLACE } from './AddPlaceQuery';
import { GET_PLACES } from '../../sharedQueries.queries';
import { toast } from 'react-toastify';

interface IState {
  address: string;
  name: string;
  lng: number;
  lat: number;
}

interface IProps extends RouteComponentProps<any> {}

class AddPlaceQuery extends Mutation<addPlace, addPlaceVariables> {}

class AddPlaceContainer extends React.Component<IProps, IState> {
  public state = { address: '', name: '', lng: 1.234, lat: 1.234 };
  public render() {
    const { address, name, lat, lng } = this.state;
    const { history } = this.props;
    return (
      <AddPlaceQuery
        mutation={ADD_PLACE}
        onCompleted={(data) => {
          const { AddPlace } = data;
          if (AddPlace.ok) {
            toast.success('장소가 추가 되었습니다.');
            setTimeout(() => {
              history.push('/places');
            }, 2000);
          } else {
            toast.error(AddPlace.error);
          }
        }}
        refetchQueries={[{ query: GET_PLACES }]}
        variables={{ name, address, lat, lng, isFav: false }}
      >
        {(addPlaceFn, loading) => (
          <AddPlacePresenter
            onInputChange={this.onInputChange}
            address={address}
            name={name}
            loading={loading}
            onSubmit={addPlaceFn}
          />
        )}
      </AddPlaceQuery>
    );
  }
  public onInputChange = async (event) => {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: value,
    } as any);
  };
}

export default AddPlaceContainer;
