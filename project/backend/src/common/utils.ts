import { Request } from 'express';

import { type BaseProduct } from '../products/models/product-model';

type BaseProductKeys = keyof BaseProduct;

export const getFilterParams = (req: Request): BaseProductKeys[] => {
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
