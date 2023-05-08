import { useEffect, useState } from 'react';
import Gateway from '@src/api/gateway';
import Divider from '@mui/material/Divider';
import Navigator from '@components/Navigator/Navigator';
import ProductsTable from '@components/ProductsTable/ProductsTable';

import { type ProductStats } from '@src/api/type';
import { ProductType } from '@common/sharedTypes';

import './inventory.css';

const Inventory = (): JSX.Element => {
  const [productsStats, setProductsStats] = useState<ProductStats[]>([]);
  const [selectedProductType, setSelectedProductType] = useState<ProductType>();
  const [currentProductCount, setCurrentProductCount] = useState<number>(0);

  const handleTypeSelection = (selectedType: ProductType): void => {
    setSelectedProductType(selectedType);
    const selectedTypeCount = productsStats.find((product) => product.type === selectedType)?.count || 0;
    setCurrentProductCount(selectedTypeCount);
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await Gateway.getProductStats();
      const productsStatsRes = response?.data;
      setProductsStats(productsStatsRes);
      setSelectedProductType(productsStatsRes?.[0]?.type);
      setCurrentProductCount(productsStatsRes?.[0]?.count || 0);
    };
    fetchData();
  }, []);

  return (
    <div className="sections-wrapper">
      <Navigator
        productsStats={productsStats}
        selectedType={selectedProductType}
        handleTypeSelection={handleTypeSelection}
      />
      <Divider orientation="vertical" sx={{ borderColor: 'white', height: '100%' }} />
      <ProductsTable selectedProductType={selectedProductType} currentProductCount={currentProductCount} />
    </div>
  );
};

export default Inventory;
