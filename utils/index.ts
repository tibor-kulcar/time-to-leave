export const normalize = (str: string) => {
  const lwrcs = str ? str.toLowerCase() : '';
  return lwrcs.normalize('NFD').replace(/\p{Diacritic}/gu, '');
};
