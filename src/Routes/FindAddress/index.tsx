import { GoogleApiWrapper } from 'google-maps-react';
import FindAddressContainer from './FindAddressContainer';
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBttpRgtnq8hIllX5c2Imy3sB7lwBiAJKw',
  language: 'ko',
})(FindAddressContainer);
