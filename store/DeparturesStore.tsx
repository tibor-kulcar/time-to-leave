import { create } from 'zustand';
import { REACT_APP_API_KEY, REACT_APP_API_URL } from '@env';
import usePersistantStore from './PersistantStore';
import { ItemProps } from '../types';

type DeparturesStore = {
  departures: ItemProps[];
  fetchDepartures: () => Promise<void>;
  fetchTime: Date;
  isLoading: boolean;
  setFetchtime: (newVal: Date) => void;
};

const useDeparturesStore = create<DeparturesStore>((set) => {
  return {
    departures: [],
    isLoading: false,
    fetchTime: new Date(),
    fetchDepartures: async () => {
      const searchText = usePersistantStore.getState().searchString.title || '';
      if (searchText === '') return;

      const query = {
        names: searchText,
        minutesBefore: '0',
        minutesAfter: '60',
        includeMetroTrains: 'true',
        preferredTimezone: 'Europe/Prague',
        mode: 'departures',
        order: 'real',
        filter: 'routeOnce',
        skip: 'canceled',
        limit: '10',
        total: '10',
        offset: '0',
      };

      const url = new URL(REACT_APP_API_URL);
      url.search = new URLSearchParams(query).toString();

      try {
        set({ isLoading: true });
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-Access-Token': REACT_APP_API_KEY,
          },
        });
        const json = await response.json();
        // console.log(json);
        set({ departures: json.departures });
      } catch (error) {
        console.error(error);
      } finally {
        set({ isLoading: false });
        set({ fetchTime: new Date() });
      }
    },

    setFetchtime: (fetchTimeValue: Date) => {
      set(() => ({ fetchTime: fetchTimeValue }));
    },
  };
});

export default useDeparturesStore;
