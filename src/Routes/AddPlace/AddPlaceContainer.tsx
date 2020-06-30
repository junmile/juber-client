import React, { useState, useCallback, useEffect } from 'react';
import AddPlacePresenter from './AddPlacePresenter';
import { ADD_PLACE } from './AddPlaceQuery';
import { GET_PLACES } from '../../sharedQueries.queries';
import { toast } from 'react-toastify';
import { useMutation } from 'react-apollo';
import { geoCode } from '../../mapHelpers';

const AddPlaceContainer = (props) => {
  console.log('props : ', props);

  const { state = {} } = props.location;
  const [correctAddress, setCorretAddress] = useState(false);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState(state.address || '');

  useEffect(() => {
    setCorretAddress(false);
  }, [address]);

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

  const enterFn = async (event) => {
    if (event.keyCode === 13) {
      if (event.target.name === 'address') {
        const result = await geoCode(address);
        if (result) {
          setCorretAddress(true);
          setAddress(result.formatted_address);
          setLat(result.lat);
          setLng(result.lng);
        } else {
          toast.error(
            '지명을 올바르게 입력해 주시거나, 지도를 통해 장소를 선택해 주세요.'
          );
        }
        console.log(correctAddress);
      }
    }
  };

  const onSubmit = () => {
    console.log('name : ', title);
    console.log('address : ', address);
    console.log('lat : ', lat, ' lng : ', lng);
    if (title === '') {
      toast.error('등록하실 장소에대해 이름을 작성해 주세요.');
      return;
    }
    if (address === '') {
      toast.error('등록하실 장소를 찾아 주세요.');
      return;
    }
    console.log('마지막 : ', correctAddress);
    if (correctAddress === true) {
      addPlaceFn({
        variables: { name: title, address, lat, lng, isFav: false },
      });
    } else {
      toast.error('잘못된 주소입니다.');
      setAddress('');
    }
  };

  const { history } = props;

  return (
    <AddPlacePresenter
      enterFn={enterFn}
      setTitle={setTitle}
      setAddress={setAddress}
      address={address}
      title={title}
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
//       <Mutation<addPlace>
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
//       </Mutation>
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
