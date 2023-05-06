import { type ProductStats } from '@src/api/type';
import { type ProductType } from '../../../../common/sharedTypes';

type NavigatorProps = {
  productsStats: ProductStats[];
  handleTypeSelection: (type: ProductType) => void;
  selectedType?: ProductType;
};
