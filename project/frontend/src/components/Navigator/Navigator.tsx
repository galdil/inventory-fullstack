import { useEffect, useState } from 'react';
import Button from '@components/Button/Button';

import { type NavigatorProps } from './types';
import { type ProductType } from '../../../../common/sharedTypes';

import './navigator.css';

const Navigator = ({ productsStats }: NavigatorProps): JSX.Element => {
  const [currentType, setCurrentType] = useState<ProductType>();

  const handleClick = (type: ProductType): void => {
    setCurrentType(type);
  };

  useEffect(() => {
    setCurrentType(productsStats?.[0]?.type);
  }, [productsStats]);

  return (
    <div className="navigator-wrapper">
      {productsStats.map((p) => (
        <Button key={p.type} label={`${p.type} - ${p.count}`} onClick={(): void => handleClick(p.type)} isSelected={p.type === currentType} />
      ))}
    </div>
  );
};

export default Navigator;
