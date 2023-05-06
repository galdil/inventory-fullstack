import Button from '@components/Button/Button';

import { type NavigatorProps } from './types';
import { type ProductType } from '../../../../common/sharedTypes';

import './navigator.css';

const Navigator = ({
  productsStats, handleTypeSelection, selectedType,
}: NavigatorProps): JSX.Element => {
  const handleClick = (type: ProductType): void => {
    handleTypeSelection(type);
  };

  return (
    <div className="navigator-wrapper">
      {productsStats.map((p) => (
        <Button key={p.type} label={`${p.type} - ${p.count}`} onClick={(): void => handleClick(p.type)} isSelected={p.type === selectedType} />
      ))}
    </div>
  );
};

export default Navigator;
