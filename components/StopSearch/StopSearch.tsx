import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { ActionMeta, SingleValue } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';
import { mdiMagnify } from '@mdi/js';
import useSWR from 'swr';

import { useSearch } from '@/hooks/useSearch';
import { StopItem } from '@/types';
import fetcher from '@/lib/fetcher';
import { Icon } from '@/components/Icon';
import { Spinner } from '@/components/Spinner';
import {
  controlStyles,
  placeholderStyles,
  selectInputStyles,
  valueContainerStyles,
  singleValueStyles,
  multiValueStyles,
  multiValueLabelStyles,
  multiValueRemoveStyles,
  clearIndicatorStyles,
  dropdownIndicatorStyles,
  menuStyles,
  groupHeadingStyles,
  optionStyles,
  messageStyles,
} from './StopSearch.styles';

import { loadOptions } from './loadOptions';

const StopSearch = () => {
  const [lastSearch, setLastSearch] = useSearch();
  const { isLoading } = useSWR('/api/pid?name=' + lastSearch[0]?.value, (url) =>
    fetcher(url)
  );

  const handleChange = (
    newValue: SingleValue<StopItem>,
    actionMeta: ActionMeta<StopItem>
  ) => {
    const updatedSearch = Array.isArray(lastSearch) ? lastSearch : [];
    const existingIndex = updatedSearch.findIndex(
      (searchItem) => searchItem.value === newValue?.value
    );

    if (existingIndex > -1) {
      updatedSearch.splice(existingIndex, 1);
    }

    updatedSearch.unshift(newValue as StopItem);
    setLastSearch(updatedSearch);
  };

  return (
    <label className="flex flex-row justify-center items-center gap-4 py-3 w-full">
      <AsyncPaginate
        key={lastSearch.length}
        unstyled
        loadOptions={(value, prevValue) =>
          loadOptions(value, prevValue, lastSearch)
        }
        isSearchable={true}
        className="w-full"
        placeholder="Search"
        closeMenuOnSelect={true}
        // menuIsOpen={true}
        // isLoading
        styles={{
          menuList: (provided, state) => ({
            ...provided,
            // 100 viewport height minus input height
            minHeight: 'calc(100vh - 82px)',
          }),
          loadingMessage: (provided, state) => ({
            ...provided,
            textAligtn: 'center',
          }),
        }}
        classNames={{
          control: ({ isFocused }) =>
            clsx(
              isFocused ? controlStyles.focus : controlStyles.nonFocus,
              controlStyles.base,
              lastSearch[0]?.value
                ? 'border-bone-200 dark:border-black'
                : 'border-black dark:border-white'
            ),
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: () => multiValueRemoveStyles,
          clearIndicator: () => clearIndicatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          menu: () => menuStyles,
          groupHeading: () => groupHeadingStyles,
          option: ({ isFocused }) =>
            clsx(optionStyles.base, isFocused && optionStyles.focus),
          noOptionsMessage: () => messageStyles,
          loadingMessage: () => messageStyles,
        }}
        defaultValue={lastSearch[0]?.value ? lastSearch : undefined}
        value={lastSearch[0]?.value ? lastSearch : undefined}
        onChange={handleChange}
        components={{
          LoadingIndicator: () => <></>,
          IndicatorSeparator: () => <></>,
          DropdownIndicator: () => (
            <>
              {isLoading ? (
                <Spinner />
              ) : (
                <Icon icon={mdiMagnify} className="z-0 w-8 h-8" />
              )}
            </>
          ),
        }}
      />
    </label>
  );
};

export default dynamic(() => Promise.resolve(StopSearch), { ssr: false });
