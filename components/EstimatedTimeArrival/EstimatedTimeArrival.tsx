import React from 'react';

type EstimatedTimeArrivalProps = {
  diff: number;
};

const twoDigits = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumIntegerDigits: 2,
});

const getTimeDiff = (diff: number) => {
  const sec = diff / 1000;
  const min = Math.floor(sec / 60);
  const diffSecs = Math.floor(sec - min * 60);

  return twoDigits.format(min) + ':' + twoDigits.format(diffSecs);
};

const EstimatedTimeArrival = ({ diff }: EstimatedTimeArrivalProps) => {
  return <span>{diff && getTimeDiff(diff)}</span>;
};

export default EstimatedTimeArrival;
