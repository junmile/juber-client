import { MAPS_KEY } from './keys';
import axios from 'axios';
import { toast } from 'react-toastify';
import Axios from 'axios';

export const geoCode = async (address: string) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${MAPS_KEY}`;
  const { data } = await Axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const { location } = results[0].geometry;
    return location;
  }
};

export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const place = results[0];
    const address = place.formatted_address;
    return address;
  } else {
    toast.error(data.error_message);
    return false;
  }
};
