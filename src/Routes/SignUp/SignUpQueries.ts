import { gql } from 'apollo-boost';

export const EMAIL_VERIFICATION = gql`
  mutation emailVerification(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $profilePhoto: String!
    $age: Int!
    $phoneNumber: String!
  ) {
    EmailSignUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      profilePhoto: $profilePhoto
      age: $age
      phoneNumber: $phoneNumber
    ) {
      ok
      error
      token
    }
  }
`;
