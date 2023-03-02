import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { REACT_APP_API_KEY, REACT_APP_API_URL } from "@env"

const getQueryString = (queries: {[key: string]: any}): string => {
  return Object.keys(queries).reduce((result: string[], key: string) => {
    return [...result, `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`]
  }, []).join('&');
};

interface DeparturesStore {
  departures: [];
  fetchDepartures: () => Promise<void>;
  fetchTime: Date;
  isLoading: boolean;
  searchString: string;
  setFetchtime: (newVal: Date) => void;
  setSearchString: (newVal: string) => void;
  walkingTime: string;
  setWalkingTime: (newVal: string) => void;
}

export const useDeparturesStore = create<DeparturesStore>((set, get) => {
  AsyncStorage.getItem('searchString').then((searchString) => {
    if (searchString !== null) {
      set(() => ({ searchString }));
    }
  });

  AsyncStorage.getItem('walkingTime').then((walkingTime) => {
    if (walkingTime !== null) {
      set(() => ({ walkingTime }));
    }
  });

  return {
    departures: [],
    isLoading: false,
    searchString: '',
    walkingTime: '3',
    fetchTime: new Date(),

    setSearchString: async (searchStringValue: string) => {
      await AsyncStorage.setItem('searchString', searchStringValue);
      set(() => ({ searchString: searchStringValue }));
    },

    setWalkingTime: async (walkingTimeValue: string) => {
      await AsyncStorage.setItem('walkingTime', walkingTimeValue);
      set(() => ({ walkingTime: walkingTimeValue }));
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
        set({ isLoading: true })
        const response = await fetch(REACT_APP_API_URL + '?' + getQueryString(query), {
          method: "GET",
          headers: {
            "X-Access-Token": REACT_APP_API_KEY,
          },
        });
        const json = await response.json();
        console.log(json);
        set({ departures: json.departures })
      } catch (error) {
        console.error(error);
      } finally {
        set({ isLoading: false })
        set({ fetchTime: new Date() })
      }
    },

    setFetchtime: (fetchTimeValue: Date) => {
      set(() => ({ fetchTime: fetchTimeValue }));
    },
  }
});
