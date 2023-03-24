import clsx from 'clsx';
import Select, { ActionMeta, SingleValue } from 'react-select';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import useLocalStorage from '@/hooks/useLocalStorage';
import useHasMounted from '@/hooks/useHasMounted';

const stopsDataUrl = '/data/pid-stops.json';

const controlStyles = {
  base: 'border-b bg-gray-900 hover:cursor-pointer',
  focus: 'border-white',
  nonFocus: 'border-gray-300 hover:border-gray-400',
};
const placeholderStyles = 'text-gray-500 pl-1 py-0.5';
const selectInputStyles = 'pl-1 py-0.5';
const valueContainerStyles = 'p-1 gap-1';
const singleValueStyles = 'leading-7 ml-1 text-xl';
const multiValueStyles =
  'bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5';
const multiValueLabelStyles = 'leading-6 py-0.5';
const multiValueRemoveStyles =
  'border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md';
const indicatorsContainerStyles = 'hidden w-0 h-0';
const clearIndicatorStyles =
  'text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800';
const indicatorSeparatorStyles = 'hidden bg-gray-300';
const dropdownIndicatorStyles =
  'w-0 h-0 p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black';
const menuStyles = 'p-1 mt-2 bg-black';
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm';
const optionStyles = {
  base: 'hover:cursor-pointer px-3 py-2 rounded',
  focus: 'bg-gray-700 active:bg-gray-900',
  selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
};
const noOptionsMessageStyles =
  'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm';

type StopItem = {
  label: string;
  value: string;
};

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
    <div
      className="
        flex flex-row justify-center items-center gap-4
        w-full
        p-3 mt-4
        z-10
      "
    >
      {hasMounted && data && (
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
      )}
    </div>
  );
};

export default StopSearch;
