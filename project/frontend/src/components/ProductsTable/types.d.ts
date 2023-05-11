import type { ProductsFields, SortOrder } from '@common/sharedTypes';

type ProductTableProps = {
  currentProductCount: number;
  selectedProductType: ProductType;
};

type QueryParamsObj = {
  sortBy?: ProductsFields;
  sortOrder?: SortOrder
  page?: string;
  items?: string;
};

type ProductFilters = {
  [field in ProductsFields]?: string[]
};
