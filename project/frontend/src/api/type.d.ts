import { type ProductType } from '../../../common/sharedTypes';

type ProductStats = {
  count: Number;
  type: ProductType;
};

type GetProductsStatsResponse = {
  data: ProductStats[];
};
