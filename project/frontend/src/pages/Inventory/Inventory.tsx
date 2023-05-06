import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Navigator from '@components/Navigator/Navigator';
// import ProductsTable from '@components/ProductsTable/ProductsTable';
import { type ProductStats } from '@src/api/type';

import Gateway from '@src/api/gateway';

import './inventory.css';

const Inventory = (): JSX.Element => {
  const [productsStats, setProductsStats] = useState<ProductStats[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await Gateway.get('products/stats');
      setProductsStats(response?.data);
    };
    fetchData();
  }, []);

  return (
    <div className="sections-wrapper">
      <Navigator productsStats={productsStats} />
      <Divider orientation="vertical" sx={{ borderColor: 'white', height: '100%' }} />
      {/* <ProductsTable /> */}
      <div>dsdas</div>
    </div>
  );
};

export default Inventory;
