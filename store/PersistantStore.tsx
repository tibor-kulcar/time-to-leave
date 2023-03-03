import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TAutocompleteDropdownItem } from 'react-native-autocomplete-dropdown';

interface PersistantStore {
  searchString: TAutocompleteDropdownItem;
  setSearchString: (newVal: TAutocompleteDropdownItem) => void;
  walkingTime: string;
  setWalkingTime: (newVal: string) => void;
}

const usePersistantStore = create(persist<PersistantStore>(
  (set) => ({
    searchString: {id:'', title:''},
    setSearchString: (newVal:TAutocompleteDropdownItem) => set({ searchString: newVal }),
    walkingTime: '3',
    setWalkingTime: (walkingTimeValue:string) => set({ walkingTime: walkingTimeValue }),
  }),
  {
    name: "ttl-storage",
    storage: createJSONStorage(() => AsyncStorage),
  }
));

export default usePersistantStore;
