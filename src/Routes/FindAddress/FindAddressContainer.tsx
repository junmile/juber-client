import React from 'react';
import FindAddressPresenter from './FindAddressPresenter';
import ReactDOM from 'react-dom';

interface IState {
  lat: number;
  lng: number;
}

class FindAddressContainer extends React.Component<any, IState> {
  // 맵오브젝트를 저장함
  public mapRef: any;
  //@ts-ignore
  public map: google.maps.Map;

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  //컴포넌트가 마운트되고나서 호출이 된다. DOM에 접근 가능
  public componentDidMount() {
    //navigator.geolocation.getCurrentPosition((포지션)=>(포지션을받아 처리할 어떤 보이드펑션))
    navigator.geolocation.getCurrentPosition(this.handleGeoSuccess);
  }

  public render() {
    return <FindAddressPresenter mapRef={this.mapRef} />;
  }

  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude },
    } = position;
    this.setState({
      lat: latitude,
      lng: longitude,
    });
    this.loadMap(latitude, longitude);
  };

  public handleGeoError = () => {
    return;
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
    const newCenter = this.map.getCenter();
    console.log(newCenter);
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    console.log(lat, lng);
    this.setState({
      lat,
      lng,
    });
  };
}

export default FindAddressContainer;
