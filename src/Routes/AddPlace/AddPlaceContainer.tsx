import React, { useState, useCallback } from 'react';
import AddPlacePresenter from './AddPlacePresenter';
import { RouteComponentProps } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { addPlace, addPlaceVariables } from '../../types/api';
import { ADD_PLACE } from './AddPlaceQuery';
import { GET_PLACES } from '../../sharedQueries.queries';
import { toast } from 'react-toastify';
import { useMutation } from 'react-apollo';

const AddPlaceContainer = (props) => {
  const { state = {} } = props.location;

  const [inputs, setInputs] = useState<{
    address: string;
    name: string;
  }>({
    address: '',
    name: '',
  });

  const [lat, setLat] = useState<number>(state.lat || 0);
  const [lng, setLng] = useState<number>(state.lng || 0);

  const [addPlaceFn, { loading }] = useMutation(ADD_PLACE, {
    onCompleted(data) {
      console.log(data, 'onCompleted');
      const { AddPlace } = data;
      if (AddPlace.ok) {
        toast.success('장소가 추가 되었습니다.');
        setTimeout(() => {
          history.push('/places');
        }, 2000);
      } else {
        toast.error(AddPlace.error);
      }
    },
    refetchQueries: [{ query: GET_PLACES }],
  });

  const onInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );

  const onSubmit = useCallback(() => {
    const { address, name } = inputs;
    addPlaceFn({ variables: { name, address, lat, lng, isFav: false } });
  }, []);

  const { history } = props;

  return (
    <AddPlacePresenter
      onInputChange={onInputChange}
      address={inputs.address}
      name={inputs.name}
      loading={loading}
      onSubmit={onSubmit}
      pickedAddress={lat !== 0 && lng !== 0}
    />
  );
};

export default AddPlaceContainer;

// interface IState {
//   address: string;
//   name: string;
//   lng: number;
//   lat: number;
// }

// interface IProps extends RouteComponentProps<any> {}

// class AddPlaceMutation extends Mutation<addPlace, addPlaceVariables> {}

// class AddPlaceContainer extends React.Component<IProps, IState> {
//   //findAddress로부터 state값을 전달받음
//   constructor(props) {
//     super(props);
//     const { location: { state = {} } = {} } = props;
//     this.state = {
//       address: state.address || '',
//       name: '',
//       lat: state.lat || 0,
//       lng: state.lng || 0,
//     };
//   }

//   public render() {
//     const { address, name, lat, lng } = this.state;
//     const { history } = this.props;
//     return (
//       <AddPlaceMutation
//         mutation={ADD_PLACE}
//         onCompleted={(data) => {
//           const { AddPlace } = data;
//           if (AddPlace.ok) {
//             toast.success('장소가 추가 되었습니다.');
//             setTimeout(() => {
//               history.push('/places');
//             }, 2000);
//           } else {
//             toast.error(AddPlace.error);
//           }
//         }}
//         refetchQueries={[{ query: GET_PLACES }]}
//         variables={{ name, address, lat, lng, isFav: false }}
//       >
//         {(addPlaceFn, loading) => (
//           <AddPlacePresenter
//             onInputChange={this.onInputChange}
//             address={address}
//             name={name}
//             loading={loading}
//             onSubmit={addPlaceFn}
//             pickedAddress={lat !== 0 && lng !== 0}
//           />
//         )}
//       </AddPlaceMutation>
//     );
//   }
//   public onInputChange = async (event) => {
//     const {
//       target: { name, value },
//     } = event;
//     this.setState({
//       [name]: value,
//     } as any);
//   };
// }

// export default AddPlaceContainer;
