import { type ProductType } from '../../../common/sharedTypes';

type ProductStats = {
  count: number;
  type: ProductType;
};

type GetProductsStatsResponse = {
  data: ProductStats[];
};
