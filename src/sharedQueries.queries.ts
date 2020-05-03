import { gql } from 'apollo-boost';

export const USER_PROFILE = gql`
  query userProfile {
    GetMyProfile {
      ok
      error
      user {
        profilePhoto
        firstName
        lastName
        email
        isDriving
        fullName
      }
    }
  }
`;

export const GET_PLACES = gql`
  query getPlaces {
    GetMyPlaces {
      ok
      error
      places {
        id
        name
        address
        isFav
      }
    }
  }
`;
