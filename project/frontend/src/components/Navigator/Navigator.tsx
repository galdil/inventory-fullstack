import Button from '@components/Button/Button';

import { type NavigatorProps } from './types';

import './navigator.css';

const Navigator = ({ productsStats }: NavigatorProps): JSX.Element => (
  <div className="navigator-wrapper">
    {productsStats.map((p) => (
      <Button key={p.type} label={`${p.type} - ${p.count}`} />
    ))}
  </div>
);

export default Navigator;
