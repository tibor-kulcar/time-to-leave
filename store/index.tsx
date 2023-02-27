import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { REACT_APP_API_KEY, REACT_APP_API_URL } from "@env"

const getQueryString = (queries: {[key: string]: any}): string => {
  return Object.keys(queries).reduce((result: string[], key: string) => {
    return [...result, `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`]
  }, []).join('&');
};

interface Departure {
  names: string,
  minutesBefore: number,
  minutesAfter: number,
  includeMetroTrains: boolean,
  preferredTimezone: string,
  mode: string,
  order: string,
  filter: string,
  skip: string,
  limit: number,
  total: number,
  offset: number,
}

interface DeparturesStore {
  departures: Departure[];
  isLoading: boolean;
  searchString: string;
  fetchDepartures: () => Promise<void>;
  setSearchString: (newVal: string) => void;
}

export const useDeparturesStore = create<DeparturesStore>((set, get) => {
  AsyncStorage.getItem('searchString').then((searchString) => {
    if (searchString !== null) {
      set(() => ({ searchString }));
    }
  });

  return {
    departures: [],
    isLoading: false,
    searchString: '',

    setSearchString: async (searchStringValue: string) => {
      await AsyncStorage.setItem('searchString', searchStringValue);
      set(() => ({ searchString: searchStringValue }));
    },

    fetchDepartures: async () => {
      const query = {
        names: get().searchString,
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

      try {
        const response = await fetch(REACT_APP_API_URL + '?' + getQueryString(query), {
          method: "GET",
          headers: {
            "X-Access-Token": REACT_APP_API_KEY,
          },
        });
        const json = await response.json();
        set({ departures: json.departures })
      } catch (error) {
        console.error(error);
      } finally {
        set({ isLoading: false })
      }
    },
  }
});
