import React from 'react';
import HomePresenter from './HomePresenter';
import { RouteComponentProps } from 'react-router-dom';
import { userProfile } from '../../types/api';
import { Query } from 'react-apollo';
import { USER_PROFILE } from '../../sharedQueries.queries';
import ReactDOM from 'react-dom';
import ward from '../../images/radio1.gif';
import arrow from '../../images/arrow.gif';
import { geoCode } from '../../mapHelpers';

interface IState {
  isMenuOpen: boolean;
  lat: number;
  lng: number;
  toAddress: string;
  toLat: number;
  toLng: number;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
}

class ProfileQuery extends Query<userProfile> {}

class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  //@ts-ignore //맵을담을객체
  public map: google.maps.Map;
  //@ts-ignore // my마커오브젝트를 담을 객체
  public userMarker: google.maps.Marker | null = null;
  //@ts-ignore // to마커오브젝트를 담을 객체
  public toMarker: google.maps.Marker | null = null;

  public state = {
    isMenuOpen: false,
    lat: 0,
    lng: 0,
    toAddress: '',
    toLat: 0,
    toLng: 0,
  };

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  public componentDidMount() {
    //position을 관찰할 예정, geolocation을 통해 반환된 position값으로 this.handleGeoSuccess 실행
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }

  public render() {
    const { isMenuOpen, toAddress } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ loading }) => (
          <HomePresenter
            loading={loading}
            isMenuOpen={isMenuOpen}
            toggleMenu={this.toggleMenu}
            mapRef={this.mapRef}
            toAddress={toAddress}
            onInputChange={this.onInputChange}
            onAddressSubmit={this.onAddressSubmit}
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
    if (this.userMarker) this.userMarker.setMap(this.map);

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
    const {
      coords: { latitude, longitude },
    } = position;
    if (this.userMarker) {
      this.userMarker.setPosition({ lat: latitude, lng: longitude });
    }
    this.map.panTo({ lat: latitude, lng: longitude });

    return;
  };
  public handleGeoWatchError = () => {
    console.log('Error watching you');
  };
  public handleGeoError = () => {
    console.log('No location');
  };

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    this.setState({
      [name]: value,
    } as any);
  };

  public onAddressSubmit = async () => {
    const { toAddress } = this.state;
    const { google } = this.props;
    const maps = google.maps;
    const result = await geoCode(toAddress);
    if (result !== undefined) {
      const { lat, lng, formatted_address: formattedAddress } = result;
      this.setState({
        toAddress: formattedAddress,
        toLat: lat,
        toLng: lng,
      });
      if (this.toMarker) {
        this.toMarker.setMap(null);
      }
      const toMarkerOptions: google.maps.MarkerOptions = {
        icon: {
          url: arrow,
          scaledSize: new google.maps.Size(25, 50),
        },
        position: {
          lat,
          lng,
        },
      };
      this.toMarker = new maps.Marker(toMarkerOptions);
      if (this.toMarker) {
        this.toMarker.setMap(this.map);
      }
    } else {
      //잘못된 검색으로 결과가 zero_result일때 input의 value를 지운다
      this.setState({
        toAddress: '',
      });
    }
  };
}

export default HomeContainer;
