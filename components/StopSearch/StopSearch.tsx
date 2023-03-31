import { useMemo } from 'react';
import clsx from 'clsx';
import { ActionMeta, SingleValue } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';
import { mdiMagnify } from '@mdi/js';

import { useSearch } from '@/hooks/useSearch';
import useHasMounted from '@/hooks/useHasMounted';
import { StopItem } from '@/types';
import { Icon } from '@/components/Icon';
import {
  controlStyles,
  placeholderStyles,
  selectInputStyles,
  valueContainerStyles,
  singleValueStyles,
  multiValueStyles,
  multiValueLabelStyles,
  multiValueRemoveStyles,
  indicatorsContainerStyles,
  clearIndicatorStyles,
  indicatorSeparatorStyles,
  dropdownIndicatorStyles,
  menuStyles,
  groupHeadingStyles,
  optionStyles,
  messageStyles,
} from './StopSearch.styles';

import { loadOptions } from './loadOptions';

const StopSearch = () => {
  const hasMounted = useHasMounted();
  const [searchString, setSearchString] = useSearch();

  const handleChange = (
    newValue: SingleValue<StopItem>,
    actionMeta: ActionMeta<StopItem>
  ) => {
    setSearchString(newValue as StopItem);
  };

  return (
    <label className="flex flex-row items-center justify-center w-full gap-4 py-3">
      {hasMounted ? (
        <AsyncPaginate
          unstyled
          loadOptions={loadOptions}
          isSearchable={true}
          className="w-full"
          placeholder="Search"
          // menuIsOpen={true}
          // isLoading
          styles={{
            menuList: (provided, state) => ({
              ...provided,
              // 100 viewport height minus input height
              minHeight: 'calc(100vh - 86px)',
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
                controlStyles.base
              ),
            placeholder: () => placeholderStyles,
            input: () => selectInputStyles,
            valueContainer: () => valueContainerStyles,
            singleValue: () => singleValueStyles,
            multiValue: () => multiValueStyles,
            multiValueLabel: () => multiValueLabelStyles,
            multiValueRemove: () => multiValueRemoveStyles,
            indicatorsContainer: () => indicatorsContainerStyles,
            clearIndicator: () => clearIndicatorStyles,
            indicatorSeparator: () => indicatorSeparatorStyles,
            dropdownIndicator: () => dropdownIndicatorStyles,
            menu: () => menuStyles,
            groupHeading: () => groupHeadingStyles,
            option: ({ isFocused, isSelected }) =>
              clsx(
                isFocused && optionStyles.focus,
                isSelected && optionStyles.selected,
                optionStyles.base
              ),
            noOptionsMessage: () => messageStyles,
            loadingMessage: () => messageStyles,
          }}
          defaultValue={searchString.value ? searchString : undefined}
          value={searchString.value ? searchString : undefined}
          onChange={handleChange}
        />
      ) : null}
      <Icon icon={mdiMagnify} className="absolute right-3 w-8 h-8 z-0" />
    </label>
  );
};

export default StopSearch;
