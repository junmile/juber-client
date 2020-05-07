import { MAPS_KEY } from './keys';
import axios from 'axios';

export const geoCode = () => null;

export const reverseGeoCode = async (lat: number, lng: number) => {
  console.log('lat : ', lat, ', lng : ', lng);
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_KEY}`;
  console.log('URL : ', URL);
  const { status, data } = await axios(URL);
  console.log('Status : ', status, ', data : ', data);
};
