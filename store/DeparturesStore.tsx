import { create } from 'zustand';
import { REACT_APP_API_KEY, REACT_APP_API_URL } from "@env"
import { usePersistantStore } from './';

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
  setFetchtime: (newVal: Date) => void;
}

const useDeparturesStore = create<DeparturesStore>((set) => {
  return {
    departures: [],
    isLoading: false,
    fetchTime: new Date(),
    fetchDepartures: async () => {
      const query = {
        names: usePersistantStore.getState().searchString,
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

export default useDeparturesStore;
