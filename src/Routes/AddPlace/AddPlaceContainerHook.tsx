import React, { useState, useCallback } from 'react';
// import { useMutation } from '@apollo/react-hooks';
// import { ADD_PLACE } from './AddPlaceQuery';
// import AddPlacePresenter from './AddPlacePresenter';
// import { toast } from 'react-toastify';
// import { GET_PLACES } from '../../sharedQueries.queries';

// const AddPlaceContainer = (props) => {
//   const { state } = props.location;

//   const [inputs, setInputs] = useState<{
//     address: string;
//     name: string;
//   }>({
//     address: state.address || '',
//     name: '',
//   });

//   const [lat, setLat] = useState<number>(state.lat || 0);
//   const [lng, setLng] = useState<number>(state.lng || 0);

//   const [addPlaceFn, { loading }] = useMutation(ADD_PLACE, {
//     onCompleted(data) {
//       console.log(data, 'onCompleted');
//       const { AddPlace } = data;
//       if (AddPlace.ok) {
//         toast.success('장소가 추가 되었습니다.');
//         setTimeout(() => {
//           history.push('/places');
//         }, 2000);
//       } else {
//         toast.error(AddPlace.error);
//       }
//     },
//     refetchQueries:[{query:GET_PLACES}]
//   });

//   const onInputChange = useCallback(
//     (e) => {
//       const { name, value } = e.target;
//       setInputs({
//         ...inputs,
//         [name]: value,
//       });
//     },
//     [inputs]
//   );

//   const onSubmit = useCallback(() => {
//     const { address, name } = inputs;
//     addPlaceFn({ variables: { name, address, lat, lng, isFav: false } });
//   }, []);

//   const { history } = props;

//   return (
//     <AddPlacePresenter
//       onInputChange={onInputChange}
//       address={inputs.address}
//       name={inputs.name}
//       loading={loading}
//       onSubmit={onSubmit}
//       pickedAddress={lat !== 0 && lng !== 0}
//     />
//   );
// };

// export default AddPlaceContainer;
