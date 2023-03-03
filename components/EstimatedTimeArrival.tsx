import React from 'react';
import { ItemText } from './Styled';

interface EstimatedTimeArrivalProps {
  diff: number;
}

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
  return <ItemText>{diff && getTimeDiff(diff)}</ItemText>;
};

export default EstimatedTimeArrival;
