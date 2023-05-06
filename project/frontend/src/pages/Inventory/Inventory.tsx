import { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Navigator from '@components/Navigator/Navigator';
import Gateway from '@src/api/gateway';
import ProductsTable from '@components/ProductsTable/ProductsTable';
import { type ProductStats } from '@src/api/type';
import { type ProductType, type Product } from '../../../../common/sharedTypes';

import './inventory.css';

const Inventory = (): JSX.Element => {
  const [productsStats, setProductsStats] = useState<ProductStats[]>([]);
  const [currentType, setCurrentType] = useState<ProductType>();
  const [productsData, setProductsData] = useState<Product[]>();

  const handleTypeSelection = (selectedType: ProductType): void => {
    setCurrentType(selectedType);
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await Gateway.getProductStats();
      const productsStatsRes = response?.data;
      setProductsStats(productsStatsRes);
      setCurrentType(productsStatsRes?.[0].type);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProductData = async (): Promise<void> => {
      const response = await Gateway.getProductsByType(currentType!);
      const productsRes = response?.data;
      setProductsData(productsRes);
    };
    if (currentType) {
      fetchProductData();
    }
  }, [currentType]);

  return (
    <div className="sections-wrapper">
      <Navigator
        productsStats={productsStats}
        selectedType={currentType}
        handleTypeSelection={handleTypeSelection}
      />
      <Divider orientation="vertical" sx={{ borderColor: 'white', height: '100%' }} />
      <ProductsTable data={productsData} />
    </div>
  );
};

export default Inventory;
