import { QueryParamsObj } from '@src/pages/Inventory/types';
import { type Product } from '../../../../common/sharedTypes';

type ProductTableProps = {
  productsData?: Product[];
  handleQueryChange: (queryParamObj: QueryParamsObj) => void;
  productCount: number;
};
