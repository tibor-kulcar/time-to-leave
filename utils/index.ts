export const normalize = (str: string) => {
  const lwrcs = str ? str.toLowerCase() : '';
  return lwrcs.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const getQueryString = (queries: { [key: string]: any }): string => {
  return Object.keys(queries)
    .reduce((result: string[], key: string) => {
      return [
        ...result,
        `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`,
      ];
    }, [])
    .join('&');
};

export default getQueryString;
