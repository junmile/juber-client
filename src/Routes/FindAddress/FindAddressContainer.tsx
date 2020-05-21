import React from 'react';
import FindAddressPresenter from './FindAddressPresenter';
import ReactDOM from 'react-dom';
import { reverseGeoCode, geoCode } from '../../mapHelpers';
import { RouteComponentProps } from 'react-router-dom';

interface IState {
  lat: number;
  lng: number;
  address: string;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
}

class FindAddressContainer extends React.Component<IProps, IState> {
  // 맵오브젝트를 저장함
  public mapRef: any;
  //@ts-ignore
  public map: google.maps.Map;

  public state = {
    address: '',
    lat: 0,
    lng: 0,
  };

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  //컴포넌트가 마운트되고나서 호출이 된다. DOM에 접근 가능
  public componentDidMount() {
    //navigator.geolocation.getCurrentPosition((포지션)=>(포지션을받아 처리할 어떤 보이드펑션))
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }

  public render() {
    const { address } = this.state;
    return (
      <FindAddressPresenter
        enter={this.enter}
        mapRef={this.mapRef}
        address={address}
        onInputChange={this.onInputChange}
        onInputBlur={this.onInputBlur}
        onPickPlace={this.onPickPlace}
      />
    );
  }

  public handleGeoSuccess: PositionCallback = (position: Position) => {
    const {
      coords: { latitude, longitude },
    } = position;
    this.setState({
      lat: latitude,
      lng: longitude,
    });
    this.loadMap(latitude, longitude);
    this.reversGeocodeAddress(latitude, longitude);
  };

  public handleGeoError: PositionErrorCallback = () => {
    console.error('no position');
  };

  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: { lat, lng },
      disableDefaultUI: true,
      zoom: 18,
    };
    this.map = new maps.Map(mapNode, mapConfig);
    this.map.addListener('dragend', this.handleDragEnd);
  };

  public handleDragEnd = () => {
    if (!this.map) {
      return;
    }
    const newCenter = this.map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    this.setState({ lat, lng });
    this.reversGeocodeAddress(lat, lng);
  };

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: value,
    } as any);
  };

  public onInputBlur = async () => {
    const { address } = this.state;
    const result = await geoCode(address);
    if (result) {
      const { formatted_address, lat, lng } = result;
      this.setState({
        address: formatted_address,
        lat,
        lng,
      });
      this.map.panTo({ lat, lng });
    }
  };
  public reversGeocodeAddress = async (lat: number, lng: number) => {
    const reversedAddress = await reverseGeoCode(lat, lng);
    //axios를 신경써줘야하기때문에 나누어서
    if (reversedAddress !== false) {
      this.setState({
        address: reversedAddress,
      });
    }
  };

  public onPickPlace = () => {
    const { address, lat, lng } = this.state;
    const { history } = this.props;
    history.push({
      pathname: '/add-place',
      state: {
        address,
        lat,
        lng,
      },
    });
  };

  public enter = (event) => {
    if (event.keyCode === 'enter') {
      this.onPickPlace();
    }
  };
}

export default FindAddressContainer;
