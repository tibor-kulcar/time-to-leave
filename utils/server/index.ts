import { getQueryString } from '@/utils';

// const getQueryString = (queries: { [key: string]: any }): string => {
//   return Object.keys(queries)
//     .reduce((result: string[], key: string) => {
//       return [
//         ...result,
//         `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`,
//       ];
//     }, [])
//     .join('&');
// };

export const FetchDepartures = async (
  searchString: string | string[] | undefined
) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'X-Access-Token': process.env.API_KEY || '',
  });
  const query = getQueryString({
    names: searchString,
    minutesBefore: 0,
    minutesAfter: 60,
    includeMetroTrains: true,
    preferredTimezone: 'Europe/Prague',
    mode: 'departures',
    order: 'real',
    filter: 'routeOnce',
    skip: 'canceled',
    limit: 10,
    total: 10,
    offset: 0,
  });

  const res = await fetch(
    process.env.API_URL + '/pid/departureboards?' + query,
    {
      method: 'GET',
      headers: headers,
    }
  );

  if (res.status !== 200) {
    const statusText = res.statusText;
    throw new Error(`Golemio API returned an error: ${statusText}`);
  }

  const json = await res.json();
  // console.log(json);
  return json;
};
