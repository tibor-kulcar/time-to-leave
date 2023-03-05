import axios from 'axios';

import { REACT_APP_API_KEY, REACT_APP_API_URL } from '@env';
import usePersistantStore from '../store/PersistantStore';

const pid = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
    'X-Access-Token': REACT_APP_API_KEY,
  },
});

export const fetchDepartures = async () => {
  const searchText = usePersistantStore.getState().searchString.title || '';
  const query = {
    names: searchText,
    minutesBefore: 0,
    minutesAfter: 60,
    includeMetroTrains: true,
    preferredTimezone: 'Europe/Prague',
    mode: 'departures',
    order: 'real',
    filter: 'routeOnce',
    skip: 'canceled',
    limit: 10,
    total: 10,
    offset: 0,
  };
  const response = await pid.get('departureboards', {
    params: query,
  });
  const departures = response;

  return departures;
};
