import React from 'react';
import HomePresenter from './HomePresenter';
import { RouteComponentProps } from 'react-router-dom';
import { userProfile } from '../../types/api';
import { Query } from 'react-apollo';
import { USER_PROFILE } from '../../sharedQueries.queries';
import ReactDOM from 'react-dom';
import ward from '../../images/radio1.gif';

interface IState {
  isMenuOpen: boolean;
  lat: number;
  lng: number;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
}

class ProfileQuery extends Query<userProfile> {}

class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  //@ts-ignore //맵을담을객체
  public map: google.maps.Map;
  //@ts-ignore //마커오브젝트를 담을 객체
  public userMarker: google.maps.Marker;

  public state = {
    isMenuOpen: false,
    lat: 0,
    lng: 0,
  };

  constructor(props) {
    super(props);
    console.log('homeContainer.props : ', props);
    this.mapRef = React.createRef();
  }

  public componentDidMount() {
    //position을 관찰할 예정, geolocation을 통해 반환된 position값으로 this.handleGeoSuccess 실행
    navigator.geolocation.watchPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }

  public render() {
    const { isMenuOpen } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ loading }) => (
          <HomePresenter
            loading={loading}
            isMenuOpen={isMenuOpen}
            toggleMenu={this.toggleMenu}
            mapRef={this.mapRef}
          />
        )}
      </ProfileQuery>
    );
  }
  public toggleMenu = () => {
    this.setState((state) => {
      return {
        isMenuOpen: !state.isMenuOpen,
      };
    });
  };

  public handleGeoSuccess = (position: Position) => {
    const {
      coords: { latitude, longitude },
    } = position;
    // 들어온  position값으로 state를 set
    this.setState({
      lat: latitude,
      lng: longitude,
    });
    this.loadMap(latitude, longitude);
  };

  public loadMap = (lat, lng) => {
    //index.tsx의 GoogleApiWrapper를통해 props에  google객체가 들어가있음
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    console.log(google, maps, mapNode);
    //맵생성
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng,
      },
      disableDefaultUI: true,
      minZoom: 8,
      zoom: 15,
    };
    this.map = new maps.Map(mapNode, mapConfig);
    //마커생성
    const userMarkerOptions: google.maps.MarkerOptions = {
      icon: { url: ward, scaledSize: new google.maps.Size(30, 30) },
      position: {
        lat,
        lng,
      },
    };
    this.userMarker = new maps.Marker(userMarkerOptions);
    this.userMarker.setMap(this.map);

    const watchOptions: PositionOptions = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.watchPosition(
      this.handleGeoWatchSuccess,
      this.handleGeoWatchError,
      watchOptions
    );
  };
  public handleGeoWatchSuccess = (position: Position) => {
    console.log('위치한 좌표가 바뀌었습니다.');
    console.log('포지션 : ', position);
    return;
  };
  public handleGeoWatchError = () => {
    console.log('Error watching you');
  };
  public handleGeoError = () => {
    console.log('No location');
  };
}

export default HomeContainer;
