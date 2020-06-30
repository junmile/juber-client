import { gql } from 'apollo-boost';

export const EMAIL_VERIFICATION = gql`
  mutation emailVerification(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $age: Int!
    $phoneNumber: String!
  ) {
    EmailSignUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      age: $age
      phoneNumber: $phoneNumber
    ) {
      ok
      error
      token
    }
  }
`;

export const REGISTRATION_CHECK = gql`
  query registrationCheck(
    $type: String!
    $phoneNumber: String
    $email: String
  ) {
    RegistrationCheck(type: $type, phoneNumber: $phoneNumber, email: $email) {
      ok
      error
      user {
        createdAt
      }
    }
  }
`;
