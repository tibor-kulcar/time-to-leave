import type { GroupBase, OptionsOrGroups } from 'react-select';
import dataset from '@/public/data/pid-stops.json';

export type OptionType = {
  value: string;
  label: string;
};

const options: OptionType[] = dataset;

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, ms);
  });

export const loadOptions = async (
  search: string,
  prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>
) => {
  await sleep(1000);

  let filteredOptions: OptionType[];
  if (!search) {
    filteredOptions = options;
  } else {
    const searchLower = search.toLowerCase();

    filteredOptions = options.filter(({ label }) =>
      label.toLowerCase().includes(searchLower)
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
