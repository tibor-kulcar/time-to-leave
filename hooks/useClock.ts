import { useEffect, useState } from 'react';

function useClock() {
  const [clock, setClock] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return clock
}

export default useClock
