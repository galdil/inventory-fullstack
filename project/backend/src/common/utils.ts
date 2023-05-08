import { Request } from 'express';

import type { ProductsFields } from '../../../common/sharedTypes';


export const getFilterParams = (req: Request): ProductsFields[] => {
  const values = req.query.filters || {};
  Object.keys(values).forEach((item) => {
    const results = [];
    const origArray = values[item].split(',');
    Object.keys(origArray).forEach((key) => {
      results.push(decodeURIComponent(origArray[key]));
    });
    values[item] = results;
  });

  return values;
};
