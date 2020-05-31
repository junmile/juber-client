import { gql } from 'apollo-boost';

export const REPORT_LOCATION = gql`
  mutation reportMovement($lat: Float!, $lng: Float!) {
    ReportMovement(lastLat: $lat, lastLng: $lng) {
      ok
    }
  }
`;

export const GET_NEARBY_DRIVERS = gql`
  query getNearbyDrivers {
    GetNearbyDrivers {
      ok
      drivers {
        id
        lastLat
        lastLng
      }
    }
  }
`;

export const REQUEST_RIDE = gql`
  mutation requestRide(
    $pickUpAddress: String!
    $pickUpLat: Float!
    $pickUpLng: Float!
    $dropOffAddress: String!
    $dropOffLat: Float!
    $dropOffLng: Float!
    $price: Float!
    $distance: String!
    $duration: String!
  ) {
    RequestRide(
      pickUpAddress: $pickUpAddress
      pickUpLat: $pickUpLat
      pickUpLng: $pickUpLng
      dropOffAddress: $dropOffAddress
      dropOffLat: $dropOffLat
      dropOffLng: $dropOffLng
      price: $price
      distance: $distance
      duration: $duration
    ) {
      ok
      error
      ride {
        id
      }
    }
  }
`;

export const GET_NEARBY_RIDE = gql`
  query getNearbyRides {
    GetNearbyRides {
      ok
      error
      ride {
        id
        pickUpAddress
        dropOffAddress
        price
        distance
        duration
        passenger {
          fullName
          profilePhoto
        }
      }
    }
  }
`;

export const ACCEPT_RIDE = gql`
  mutation acceptRide($rideId: Int!) {
    UpdateRideStatus(rideId: $rideId, status: ACCEPTED) {
      ok
      error
      rideId
    }
  }
`;

export const SUBSCRIBE_NEARBY_RIDES = gql`
  subscription nearbyRides {
    NearbyRideSubscription {
      id
      pickUpAddress
      dropOffAddress
      price
      distance
      duration
      passenger {
        fullName
        profilePhoto
      }
    }
  }
`;

export const GET_RIDE_BY_ID = gql`
  query getRidebyId {
    GetRidebyId {
      ok
      error
      ride {
        id
        status
      }
    }
  }
`;

export const RIDE_SUBSCRIPTION_HOME = gql`
  subscription rideUpdatesHome {
    RideStatusSubscription {
      id
      status
      pickUpAddress
      dropOffAddress
      price
      distance
      duration
      driver {
        id
        fullName
        profilePhoto
      }
      passenger {
        id
        fullName
        profilePhoto
      }
      chatId
    }
  }
`;
