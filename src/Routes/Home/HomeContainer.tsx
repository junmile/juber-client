import React from 'react';
import HomePresenter from './HomePresenter';
import { RouteComponentProps } from 'react-router-dom';
import {
  userProfile,
  getNearbyDrivers,
  requestRide,
  requestRideVariables,
  getNearbyRides,
  acceptRideVariables,
  acceptRide,
  getRidebyId,
} from '../../types/api';
import { Query, graphql, MutationFn, Mutation } from 'react-apollo';
import { USER_PROFILE } from '../../sharedQueries.queries';
import ReactDOM from 'react-dom';
import carIcon from '../../images/car.png';
import ward from '../../images/radio2.gif';
import arrow from '../../images/arrow2.gif';
import { geoCode, reverseGeoCode } from '../../mapHelpers';
import { toast } from 'react-toastify';

import { reportMovement, reportMovementVariables } from '../../types/api';
import {
  RIDE_SUBSCRIPTION_HOME,
  SUBSCRIBE_NEARBY_RIDES,
  REPORT_LOCATION,
  GET_NEARBY_DRIVERS,
  REQUEST_RIDE,
  GET_NEARBY_RIDE,
  ACCEPT_RIDE,
  GET_RIDE_BY_ID,
} from './HomeQueries';
import { SubscribeToMoreOptions } from 'apollo-boost';

interface IState {
  requested: boolean;
  isMenuOpen: boolean;
  lat: number;
  lng: number;
  toAddress: string;
  toLat: number;
  toLng: number;
  distance: string;
  duration?: string;
  price?: number;
  distanceValue: number;
  fromAddress: string;
  isDriving: boolean;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
  reportLocation: MutationFn;
}

class ProfileQuery extends Query<userProfile> {}
class NearbyQuery extends Query<getNearbyDrivers> {}
class RequestRideMutation extends Mutation<requestRide, requestRideVariables> {}
class GetNearbyRidesQuery extends Query<getNearbyRides> {}
class AcceptRide extends Mutation<acceptRide, acceptRideVariables> {}
class GetRidebyIdQuery extends Query<getRidebyId> {}

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
    requested: false,
    fromAddress: '',
    isMenuOpen: false,
    lat: 0,
    lng: 0,
    toAddress: '대한민국 서울특별시 마포구 상수동 와우산로 94',
    toLat: 0,
    toLng: 0,
    distance: '',
    duration: undefined,
    price: 0,
    distanceValue: 0,
    isDriving: false,
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
    const {
      requested,
      isMenuOpen,
      toAddress,
      distance,
      fromAddress,
      lat,
      lng,
      toLat,
      toLng,
      price,
      duration,
      isDriving,
    } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE} onCompleted={this.handleProfileQuery}>
        {({ data, loading }) => (
          <NearbyQuery
            query={GET_NEARBY_DRIVERS}
            pollInterval={5000}
            skip={isDriving}
            onCompleted={this.handleNearbyDrivers}
          >
            {() => (
              <RequestRideMutation
                mutation={REQUEST_RIDE}
                onCompleted={this.handleRideRequest}
                variables={{
                  distance,
                  pickUpAddress: fromAddress,
                  pickUpLat: lat,
                  pickUpLng: lng,
                  dropOffLat: toLat,
                  dropOffLng: toLng,
                  dropOffAddress: toAddress,
                  price: price || 0,
                  duration: duration || '',
                }}
              >
                {(requestRideFn) => (
                  <GetNearbyRidesQuery
                    query={GET_NEARBY_RIDE}
                    skip={!isDriving}
                  >
                    {({ subscribeToMore, data: getNearbyRide }) => {
                      console.log('라이드 : ', getNearbyRide);
                      //subscribe할 옵션설정
                      const rideSubscriptionOptions: SubscribeToMoreOptions = {
                        // document에는 subcription에 해당하는 쿼리
                        document: SUBSCRIBE_NEARBY_RIDES,
                        // updateQuery에는 기존의 쿼리(prev) 로부터 result 결과를 얻음
                        updateQuery: (prev, { subscriptionData }) => {
                          //subscriptionData.data가 존재하지 않을때 기존의 prev객체를 리턴한다(getNearbyRide)
                          if (!subscriptionData.data) {
                            return prev;
                          }
                          //아닐경우 prev와 같은 형태의 구조로 리턴을 해주어야함
                          //Object.assign 은 맨앞의 파라메터에 차순의 파라메터의 값을 병합한다
                          //빈 파라메터에 prev의 파라메터를 병합하고
                          //prev의 파라메터에 GetNearbyRides에 ...prev.GetNearbyRides 값을 병함하고 GetNearbyRides의 ride값에는 subscriptionData.data.nearbyRideSubscription값을 병함한다
                          const newObject = Object.assign({}, prev, {
                            GetNearbyRides: {
                              ...prev.GetNearbyRides,
                              ride:
                                subscriptionData.data.NearbyRideSubscription,
                            },
                          });
                          return newObject;
                        },
                      };
                      if (isDriving) {
                        subscribeToMore(rideSubscriptionOptions);
                      }
                      return (
                        <AcceptRide
                          mutation={ACCEPT_RIDE}
                          onCompleted={this.handleRideAcceptance}
                        >
                          {(acceptRideFn) => {
                            return (
                              <GetRidebyIdQuery
                                query={GET_RIDE_BY_ID}
                                onCompleted={this.goMatching}
                              >
                                {({
                                  data: getRidebyIdQuery,
                                  subscribeToMore,
                                }) => {
                                  const subscribeToPassengerOptions: SubscribeToMoreOptions = {
                                    document: RIDE_SUBSCRIPTION_HOME,
                                    updateQuery: (
                                      prev,
                                      { subscriptionData }
                                    ) => {
                                      if (!subscriptionData.data) {
                                        return prev;
                                      }
                                      console.log('프리뷰 :', prev);
                                      console.log(
                                        subscriptionData.data
                                          .RideStatusSubscription
                                      );
                                      if (
                                        subscriptionData.data
                                          .RideStatusSubscription.status ===
                                        'FINISHED'
                                      ) {
                                        return;
                                      }
                                      const newObject = Object.assign(
                                        {},
                                        prev,
                                        {
                                          GetRidebyId: {
                                            ...prev.GetRidebyId,
                                            ride:
                                              subscriptionData.data
                                                .RideStatusSubscription,
                                          },
                                        }
                                      );
                                      return newObject;
                                    },
                                  };
                                  if (!isDriving) {
                                    subscribeToMore(
                                      subscribeToPassengerOptions
                                    );
                                  }

                                  return (
                                    <HomePresenter
                                      requested={requested}
                                      isMenuOpen={isMenuOpen}
                                      toggleMenu={this.toggleMenu}
                                      mapRef={this.mapRef}
                                      toAddress={toAddress}
                                      onInputChange={this.onInputChange}
                                      price={price}
                                      data={data}
                                      onAddressSubmit={this.onAddressSubmit}
                                      requestRideFn={requestRideFn}
                                      getNearbyRide={getNearbyRide}
                                      acceptRideFn={acceptRideFn}
                                      enter={this.enter}
                                      getRidebyIdQuery={getRidebyIdQuery}
                                    />
                                  );
                                }}
                              </GetRidebyIdQuery>
                            );
                          }}
                        </AcceptRide>
                      );
                    }}
                  </GetNearbyRidesQuery>
                )}
              </RequestRideMutation>
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
    console.log(latitude, longitude);
    this.setState({
      lat: latitude,
      lng: longitude,
    });
    this.getFromAddress(latitude, longitude);
    this.loadMap(latitude, longitude);
  };

  public getFromAddress = async (lat: number, lng: number) => {
    const address = await reverseGeoCode(lat, lng);
    console.log(address);
    if (address) {
      this.setState({
        fromAddress: address,
      });
    }
  };

  public loadMap = (lat, lng) => {
    //index.tsx의 GoogleApiWrapper를통해 props에  google객체가 들어가있음
    const { google } = this.props;
    const maps = google.maps;
    console.log('디스맵커런트 : ', this.mapRef.current);
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
    return Number.parseFloat((distanceValue * 1.14).toFixed(0));
  };

  public priceCalComma = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
  };

  public handleNearbyDrivers = (data: {} | getNearbyDrivers) => {
    if ('GetNearbyDrivers' in data) {
      const {
        GetNearbyDrivers: { drivers, ok },
      } = data;
      if (ok && drivers) {
        for (const driver of drivers) {
          if (driver && driver.lastLat && driver.lastLng) {
            console.log('드라이버의 아이디 : ', driver.id);
            //마커가 existingDriver의 요구조건을 충족시키는(drivers의 각 ID가 markerId와 같은 drivers의 엘리먼트인지 )
            //새로운출현(아이디가 다르다면 마커를 추가해야하므로)
            const exisitingDriver:
              | google.maps.Marker
              | undefined = this.drivers.find(
              (driverMarker: google.maps.Marker) => {
                const markerID = driverMarker.get('ID');
                return markerID === driver.id;
              }
            );
            //마커아이디가 드라이버의 아이디와 같다면(맵에 이미 뿌려진 마커라면)
            if (exisitingDriver) {
              exisitingDriver.setPosition({
                lat: driver.lastLat,
                lng: driver.lastLng,
              });
              exisitingDriver.setMap(this.map);
            } else {
              const markerOptions: google.maps.MarkerOptions = {
                position: {
                  lat: driver.lastLat,
                  lng: driver.lastLng,
                },
                icon: {
                  url: carIcon,
                  scaledSize: new google.maps.Size(30, 30),
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
    }
  };

  public handleRideRequest = (data: requestRide) => {
    const { history } = this.props;
    const { RequestRide } = data;
    if (RequestRide) {
      toast.success('요청이 완료되었습니다. 운전자를 찾고있습니다.');
      this.setState({ requested: true });
      history.push('/');
    }
  };
  public handleProfileQuery = (data: userProfile) => {
    const { GetMyProfile } = data;
    if (GetMyProfile.user) {
      const {
        user: { isDriving },
      } = GetMyProfile;
      if (isDriving) {
        this.setState({
          isDriving,
        });
      }
    }
  };
  public enter = (event) => {
    if (event.keyCode === 13) {
      this.onAddressSubmit();
    }
  };

  public handleSubscriptionUpdate = (data) => {
    console.log(data);
  };

  public handleRideAcceptance = (data: acceptRide) => {
    const { history } = this.props;
    const { UpdateRideStatus } = data;
    if (UpdateRideStatus) {
      console.log('이거당 : ', UpdateRideStatus);
      history.push(`/ride/${UpdateRideStatus.rideId}`);
    }
  };

  public goMatching = (data) => {
    const { history } = this.props;
    if (data) {
      if (data.GetRidebyId) {
        if (data.GetRidebyId.ride) {
          if (
            data.GetRidebyId.ride.status === 'ONROUTE' ||
            data.GetRidebyId.ride.status === 'ACCEPTED'
          ) {
            history.push(`/ride/${data.GetRidebyId.ride.id}`);
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
