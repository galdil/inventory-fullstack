import { QueryParamsObj } from '@src/pages/Inventory/types';
import { type Product } from '../../../../common/sharedTypes';

type ProductTableProps = {
  data?: Product[];
  handleQueryChange: (queryParamObj: QueryParamsObj) => void
};
