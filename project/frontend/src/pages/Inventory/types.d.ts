import { type Product, type SortOrder } from '../../../../common/sharedTypes';

type QueryParamsObj = {
  sortBy?: keyof Product;
  sortOrder?: SortOrder
};
