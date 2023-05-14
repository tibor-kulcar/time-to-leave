import type { GroupBase, OptionsOrGroups } from 'react-select';
import dataset from '@/public/data/pid-stops.json';
import { StopItem } from '@/types';

const options: StopItem[] = dataset;

const normalize = (str: string) => {
  const lwrcs = str ? str.toLowerCase() : '';
  return lwrcs
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]/g, '');
};

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, ms);
  });

export const loadOptions = async (
  search: string,
  prevOptions: OptionsOrGroups<StopItem, GroupBase<StopItem>>
) => {
  await sleep(500);

  let filteredOptions: StopItem[];
  if (!search) {
    filteredOptions = options;
  } else {
    const searchLower = normalize(search);

    filteredOptions = options.filter(({ label }) =>
      normalize(label).includes(searchLower)
    );
  }

  const hasMore = filteredOptions.length > prevOptions.length + 10;
  const slicedOptions = filteredOptions.slice(
    prevOptions.length,
    prevOptions.length + 10
  );

  return {
    options: slicedOptions,
    hasMore,
  };
};
