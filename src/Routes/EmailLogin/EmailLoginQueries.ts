import { gql } from 'apollo-boost';

export const EMAIL_SIGN_IN = gql`
  mutation emailSiginIn($email: String!, $password: String!) {
    EmailSignIn(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;
