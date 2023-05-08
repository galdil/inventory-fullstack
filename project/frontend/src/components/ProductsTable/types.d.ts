import { type Product, type SortOrder } from '@common/sharedTypes';

type ProductTableProps = {
  currentProductCount: number;
  selectedProductType: ProductType;
};

type QueryParamsObj = {
  sortBy?: keyof Product;
  sortOrder?: SortOrder
  page?: string;
  items?: string;
};
