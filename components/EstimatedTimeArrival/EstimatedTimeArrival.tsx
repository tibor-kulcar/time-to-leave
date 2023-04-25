type EstimatedTimeArrivalProps = {
  diff: number;
};

const formatTimeUnit = (unit: number) => (unit | 0).toString().padStart(2, '0');

const TIME_UNITS = [3600000, 60000, 1000];

const getTimeDiff = (diff: number) => {
  const timeParts = TIME_UNITS.map((unit, i) => {
    const timeValue = ((diff / unit) | 0) % 60;
    if (i === 0 && timeValue === 0) return null; // Skip hours if 0
    return `${formatTimeUnit(timeValue)}`;
  }).filter(Boolean);

  return timeParts.join(':');
};

const EstimatedTimeArrival = ({ diff }: EstimatedTimeArrivalProps) => {
  return <span>{diff && getTimeDiff(diff)}</span>;
};

export default EstimatedTimeArrival;
