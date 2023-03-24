import Select, { ActionMeta, SingleValue } from 'react-select';

import useLocalStorage from '@/hooks/useLocalStorage';
import useHasMounted from '@/hooks/useHasMounted';

// TODO async
import stops from '@/public/data/pid-stops.json';

type StopItem = {
  label: string;
  value: string;
};

const StopSearch = () => {
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
      {hasMounted && (
        <Select
          className="w-full"
          defaultValue={searchString}
          value={searchString}
          onChange={handleChange}
          options={stops}
        />
      )}
    </div>
  );
};

export default StopSearch;
