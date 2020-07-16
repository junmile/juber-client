import React, { useState, useEffect } from 'react';
import FindAddressPresenter from './FindAddressPresenter';
import ReactDOM from 'react-dom';
import { reverseGeoCode, geoCode } from '../../mapHelpers';

let map: google.maps.Map;

const FindAddressContainer: React.FC = (props: React.ReactNode) => {
  const mapRef: any = React.useRef();
  const [address, setAddress] = useState('');

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setAddress(value);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError, {
      enableHighAccuracy: true,
      maximumAge: 60000,
      timeout: 10000,
    });
  }, []);

  const handleGeoSuccess: PositionCallback = (position: Position) => {
    const {
      coords: { latitude: lat, longitude: lng },
    } = position;
    setLat(lat);
    setLng(lng);
    loadMap(lat, lng);
    reversGeocodeAddress(lat, lng);
  };

  const handleGeoError: PositionErrorCallback = () => {
    console.error('no position');
  };

  const loadMap = (lat, lng) => {
    //@ts-ignore
    const { google } = props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: { lat, lng },
      disableDefaultUI: true,
      zoom: 16,
    };
    map = new maps.Map(mapNode, mapConfig);
    map.addListener('dragend', handleDragEnd);
  };

  const handleDragEnd = () => {
    //@ts-ignore
    const newCenter = map.getCenter();
    const latitude = newCenter.lat();
    const longitude = newCenter.lng();
    // centerMarker?.setMap(null);
    // const centerMarkerOptions: google.maps.MarkerOptions = {
    //   icon: { url: arrow, scaledSize: new google.maps.Size(30, 60) },
    //   position: {
    //     lat,
    //     lng,
    //   },
    // };
    // centerMarker = new google.maps.Marker(centerMarkerOptions);
    // centerMarker.setMap(map);
    setLat(latitude);
    setLng(longitude);

    reversGeocodeAddress(latitude, longitude);
    // if (map) {
    //   return;
    // }
  };

  const enterFn = async (event) => {
    if (event.keyCode === 13) {
      const result = await geoCode(address);
      if (result) {
        const { formatted_address, lat, lng } = result;
        setAddress(formatted_address);
        setLat(lat);
        setLng(lng);
        map.panTo({ lat, lng });
      }
    }
  };

  const onInputBlur = async () => {
    const result = await geoCode(address);
    if (result) {
      const { formatted_address, lat, lng } = result;
      setAddress(formatted_address);
      setLat(lat);
      setLng(lng);
      map.panTo({ lat, lng });
    }
  };

  const reversGeocodeAddress = async (lat: number, lng: number) => {
    const reversedAddress = await reverseGeoCode(lat, lng);
    //axios를 신경써줘야하기때문에 나누어서
    if (reversedAddress !== false) {
      setLat(lat);
      setLng(lng);
      setAddress(reversedAddress);
    }
  };

  const onPickPlace = () => {
    //@ts-ignore
    const { history } = props;
    history.push({
      pathname: '/add-place',
      state: {
        address,
        lat,
        lng,
      },
    });
  };

  return (
    <FindAddressPresenter
      enter={enterFn}
      mapRef={mapRef}
      address={address}
      setAddress={onInputChange}
      onInputBlur={onInputBlur}
      onPickPlace={onPickPlace}
    />
  );
};

// interface IProps extends RouteComponentProps<any> {
//   google: any;
// }

// interface IState {
//   address: string;
//   lat: number;
//   lng: number;
// }

// class FindAddressContainer extends React.Component<IProps, IState> {
//   // 맵오브젝트를 저장함
//   public mapRef: any;
//   //@ts-ignore
//   public map: google.maps.Map;

//   public state = {
//     address: '',
//     lat: 0,
//     lng: 0,
//   };

//   constructor(props) {
//     super(props);
//     this.mapRef = React.createRef();
//   }
//   //컴포넌트가 마운트되고나서 호출이 된다. DOM에 접근 가능
//   public componentDidMount() {
//     console.log(this.mapRef);
//     //navigator.geolocation.getCurrentPosition((포지션)=>(포지션을받아 처리할 어떤 보이드펑션))
//     navigator.geolocation.getCurrentPosition(
//       this.handleGeoSuccess,
//       this.handleGeoError,
//       { enableHighAccuracy: true, maximumAge: 60000, timeout: 10000 }
//     );
//   }

//   public handleGeoSuccess: PositionCallback = (position: Position) => {
//     const {
//       coords: { latitude, longitude },
//     } = position;
//     this.setState({
//       lat: latitude,
//       lng: longitude,
//     });
//     this.loadMap(latitude, longitude);
//     this.reversGeocodeAddress(latitude, longitude);
//   };

//   public handleGeoError: PositionErrorCallback = () => {
//     console.error('no position');
//   };

//   public loadMap = (lat, lng) => {
//     const { google } = this.props;
//     const maps = google.maps;
//     const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
//     console.log(this.mapRef);
//     console.log('맵노드 : ', mapNode);

//     const mapConfig: google.maps.MapOptions = {
//       center: { lat, lng },
//       disableDefaultUI: true,
//       zoom: 16,
//     };
//     this.map = new maps.Map(mapNode, mapConfig);
//     console.log(' 디스맵 : ', this.map);
//     this.map.addListener('click', this.kkkkk);
//     this.map.addListener('dragend', this.handleDragEnd);
//     console.log(' 디스맵 : ', this.map);
//   };

//   public kkkkk = () => {
//     console.log('눌려버림');
//   };

//   public handleDragEnd = (e) => {
//     console.log('핸들드래그엔드');
//     console.log(e);
//     if (!this.map) {
//       return;
//     }
//     const newCenter = this.map.getCenter();
//     const lat = newCenter.lat();
//     const lng = newCenter.lng();
//     this.setState({ lat, lng });
//     this.reversGeocodeAddress(lat, lng);
//   };

//   public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const {
//       target: { name, value },
//     } = event;
//     this.setState({
//       [name]: value,
//     } as any);
//   };

//   public onInputBlur = async () => {
//     const { address } = this.state;
//     const result = await geoCode(address);
//     if (result) {
//       const { formatted_address, lat, lng } = result;
//       this.setState({
//         address: formatted_address,
//         lat,
//         lng,
//       });
//       this.map.panTo({ lat, lng });
//     }
//   };
//   public reversGeocodeAddress = async (lat: number, lng: number) => {
//     const reversedAddress = await reverseGeoCode(lat, lng);
//     //axios를 신경써줘야하기때문에 나누어서
//     if (reversedAddress !== false) {
//       this.setState({
//         address: reversedAddress,
//       });
//     }
//   };

//   public onPickPlace = () => {
//     const { address, lat, lng } = this.state;
//     const { history } = this.props;
//     console.log(address, lat, lng, history);
//     history.push({
//       pathname: '/add-place',
//       state: {
//         address,
//         lat,
//         lng,
//       },
//     });
//   };

//   public enter = (event) => {
//     if (event.keyCode === 13) {
//       this.onPickPlace();
//     }
//   };

//   public render() {
//     const { address } = this.state;
//     return (
//       <FindAddressPresenter
//         enter={this.enter}
//         mapRef={this.mapRef}
//         address={address}
//         onInputChange={this.onInputChange}
//         onInputBlur={this.onInputBlur}
//         onPickPlace={this.onPickPlace}
//       />
//     );
//   }
// }

export default FindAddressContainer;
