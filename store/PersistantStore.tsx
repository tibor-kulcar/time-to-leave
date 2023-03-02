import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PersistantStore {
  searchString: string;
  setSearchString: (newVal: string) => void;
  walkingTime: string;
  setWalkingTime: (newVal: string) => void;
}

const usePersistantStore = create(persist<PersistantStore>(
  (set) => ({
    searchString: '',
    setSearchString: (searchStringValue:string) => set({ searchString: searchStringValue }),
    walkingTime: '3',
    setWalkingTime: (walkingTimeValue:string) => set({ walkingTime: walkingTimeValue }),
  }),
  {
    name: "ttl-storage",
    storage: createJSONStorage(() => AsyncStorage),
  }
));

export default usePersistantStore;
