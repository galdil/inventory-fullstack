import { ProductFilters } from '@components/ProductsTable/types';

export const toTitleCase = (str: string): string => (
  str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())
);

export const convertToQueryString = (filters: ProductFilters): string => {
  if (!Object.keys.length) return '';
  const queryString = Object.entries(filters)
    .map(([key, value]) => {
      const encodedKey = encodeURIComponent(`filters[${key}]`);
      const encodedValue = value.join(',');
      return `${encodedKey}=${encodedValue}`;
    })
    .join('&');
  return queryString;
};
