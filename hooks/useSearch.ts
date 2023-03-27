// import { useLocalStorage } from '@/hooks//useLocalStorage';
import { useLocalStorage } from 'usehooks-ts';

import { StopItem } from '@/types';

export function useSearch() {
  return useLocalStorage<StopItem>('search', {
    label: '',
    value: '',
  });
}
