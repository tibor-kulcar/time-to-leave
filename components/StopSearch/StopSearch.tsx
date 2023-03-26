import clsx from 'clsx';
import Select, { ActionMeta, SingleValue } from 'react-select';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import useLocalStorage from '@/hooks/useLocalStorage';
import useHasMounted from '@/hooks/useHasMounted';
import { StopItem } from '@/types';
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
  noOptionsMessageStyles,
} from './StopSearch.styles';
const stopsDataUrl = '/data/pid-stops.json';

const StopSearch = () => {
  const { data } = useSWR(stopsDataUrl, fetcher);
  console.log('StopSearch');
  const hasMounted = useHasMounted();
  const [searchString, setSearchString] = useLocalStorage<StopItem>(
    'searchString',
    {
      label: '',
      value: '',
    }
  );

  const handleChange = (
    newValue: SingleValue<StopItem>,
    actionMeta: ActionMeta<StopItem>
  ) => {
    setSearchString(newValue as StopItem);
  };

  return (
    <div className="z-50 flex flex-row items-center justify-center w-full gap-4 p-3 mt-4 ">
      {hasMounted && data ? (
        <Select
          unstyled
          isSearchable={true}
          className="w-full"
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
            noOptionsMessage: () => noOptionsMessageStyles,
          }}
          defaultValue={searchString}
          value={searchString}
          onChange={handleChange}
          options={data}
        />
      ) : null}
    </div>
  );
};

export default StopSearch;
