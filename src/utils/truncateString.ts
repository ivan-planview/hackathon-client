export const truncateString = (str: string, length?: number) => {
  const defaultLength = 24;

  return str.length > (length ?? defaultLength)
    ? str.substring(0, length ?? defaultLength) + '...'
    : str;
};
