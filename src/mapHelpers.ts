import { MAPS_KEY } from './keys';
import axios from 'axios';
import { toast } from 'react-toastify';

export const geoCode = () => null;

export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_KEY}`;
  const { status, data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const place = results[0];
    const address = place.formatted_address;
    return address;
  } else {
    toast.error(data.error_message);
  }
};
