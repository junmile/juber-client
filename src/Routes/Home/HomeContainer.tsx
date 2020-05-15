import React from 'react';
import HomePresenter from './HomePresenter';
import { RouteComponentProps } from 'react-router-dom';
import { userProfile, getNearbyDrivers } from '../../types/api';
import { Query, graphql, MutationFn } from 'react-apollo';
import { USER_PROFILE } from '../../sharedQueries.queries';
import ReactDOM from 'react-dom';
import ward from '../../images/radio2.gif';
import arrow from '../../images/arrow2.gif';
import { geoCode } from '../../mapHelpers';
import { toast } from 'react-toastify';

import { reportMovement, reportMovementVariables } from '../../types/api';
import { REPORT_LOCATION, GET_NEARBY_DRIVERS } from './HomeQueries';

interface IState {
  isMenuOpen: boolean;
  lat: number;
  lng: number;
  toAddress: string;
  toLat: number;
  toLng: number;
  distance: string;
  duration?: string;
  price?: string;
  distanceValue: number;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
  reportLocation: MutationFn;
}

class ProfileQuery extends Query<userProfile> {}
class NearbyQuery extends Query<getNearbyDrivers> {}

class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  //맵을담을객체
  public map: google.maps.Map;
  // my마커오브젝트를 담을 객체
  public userMarker: google.maps.Marker | null = null;
  // to마커오브젝트를 담을 객체
  public toMarker: google.maps.Marker | null = null;
  public directions: google.maps.DirectionsRenderer;
  public drivers: google.maps.Marker[];
  //state 설정
  public state = {
    isMenuOpen: false,
    lat: 0,
    lng: 0,
    toAddress: '대한민국 서울특별시 마포구 상수동 와우산로 94',
    toLat: 0,
    toLng: 0,
    distance: '',
    durations: undefined,
    price: '',
    distanceValue: 0,
  };

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.drivers = [];
  }

  public componentDidMount() {
    //position을 관찰할 예정, geolocation을 통해 반환된 position값으로 this.handleGeoSuccess 실행
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    );
  }

  public render() {
    const { isMenuOpen, toAddress, price } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data, loading }) => (
          <NearbyQuery
            query={GET_NEARBY_DRIVERS}
            skip={
              (data &&
                data.GetMyProfile &&
                data.GetMyProfile.user &&
                data.GetMyProfile.user.isDriving) ||
              false
            }
            onCompleted={this.handleNearbyDrivers}
          >
            {() => (
              <HomePresenter
                loading={loading}
                isMenuOpen={isMenuOpen}
                toggleMenu={this.toggleMenu}
                mapRef={this.mapRef}
                toAddress={toAddress}
                onInputChange={this.onInputChange}
                price={price}
                data={data}
                onAddressSubmit={this.onAddressSubmit}
              />
            )}
          </NearbyQuery>
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

  //geoLocation으로 반환받은 position
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
    if (!mapNode) {
      this.loadMap(lat, lng);
      return;
    }
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
      //배터리를 더소모해서 좀더 높은 정확성을 갖는다
      enableHighAccuracy: true,
    };
    //navigator.geolocation.watchPosition메소드는 (성공시 실행될 함수, 실패시 실행될 함수, PositionOptions의 타입을 갖는 Option을 인자로 갖는다)
    navigator.geolocation.watchPosition(
      this.handleGeoWatchSuccess,
      this.handleGeoWatchError,
      watchOptions
    );
  };
  //watchPosition이 실행되었을때 (위치값이 이동된다면)
  public handleGeoWatchSuccess = (position: Position) => {
    const { reportLocation } = this.props;
    const {
      coords: { latitude, longitude },
    } = position;
    if (this.userMarker) {
      this.userMarker.setPosition({ lat: latitude, lng: longitude });
    }
    this.map.panTo({ lat: latitude, lng: longitude });
    reportLocation({
      variables: {
        lat: latitude,
        lng: longitude,
      },
    });
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
      //bounds객체를 생성
      const bounds = new maps.LatLngBounds();
      bounds.extend({ lat, lng });
      bounds.extend({ lat: this.state.lat, lng: this.state.lng });
      this.map.fitBounds(bounds);
      this.setState(
        {
          toAddress: formattedAddress,
          toLat: lat,
          toLng: lng,
        },
        this.createPath
      );
    } else {
      //잘못된 검색으로 결과가 zero_result일때 input의 value를 지운다
      this.setState({
        toAddress: '',
      });
    }
  };

  public createPath = () => {
    const { toLat, toLng, lat, lng } = this.state;
    console.log('lat, lng : ', lat, ',', lng);
    console.log('toLat, toLng : ', toLat, ',', toLng);
    if (this.directions) {
      this.directions.setMap(null);
    }

    const renderOptions: google.maps.DirectionsRendererOptions = {
      polylineOptions: {
        strokeColor: 'green',
      },
      suppressMarkers: true,
    };
    this.directions = new google.maps.DirectionsRenderer(renderOptions);
    const directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
    const to = new google.maps.LatLng(toLat, toLng);
    const from = new google.maps.LatLng(lat, lng);
    const directionsOptions: google.maps.DirectionsRequest = {
      destination: to,
      origin: from,
      travelMode: google.maps.TravelMode.TRANSIT,
    };
    directionsService.route(directionsOptions, this.handleRouteRequest);
  };

  public handleRouteRequest = (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const { routes } = result;
      const {
        distance: { text: distance, value: distanceValue },
        duration: { text: duration },
      } = routes[0].legs[0];
      this.directions.setDirections(result);
      this.directions.setMap(this.map);
      this.setState({
        distance,
        distanceValue,
        duration,
        price: this.priceCal(distanceValue),
      });
    } else {
      toast.error('해당 목적지까지 갈 수 있는 방법이 존재하지 않습니다.');
      this.setState({
        toAddress: '',
      });
    }
  };

  public priceCal = (distanceValue) => {
    return distanceValue
      ? Number.parseFloat((distanceValue * 1.14).toFixed(0))
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : '0';
  };
  public handleNearbyDrivers = (data: {} | getNearbyDrivers) => {
    console.log('소환');
    if ('GetNearbyDrivers' in data) {
      const {
        GetNearbyDrivers: { drivers, ok },
      } = data;
      if (ok && drivers) {
        for (const driver of drivers) {
          console.log('드라이버: ', driver);
          if (driver) {
            const markerOptions: google.maps.MarkerOptions = {
              position: {
                lat: driver.lastLat,
                lng: driver.lastLng,
              },
              icon: {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 5,
              },
            };
            const newMarker: google.maps.Marker = new google.maps.Marker(
              markerOptions
            );
            newMarker.set('ID', driver.id);
            newMarker.setMap(this.map);
            this.drivers.push(newMarker);
          }
        }
      }
    }
  };
}

export default graphql<any, reportMovement, reportMovementVariables>(
  REPORT_LOCATION,
  {
    name: 'reportLocation',
  }
)(HomeContainer);
