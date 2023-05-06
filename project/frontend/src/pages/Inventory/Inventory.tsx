import Divider from '@mui/material/Divider';
import Navigator from '@components/Navigator/Navigator';

import './inventory.css';

const Inventory = (): JSX.Element => (
  <div className="sections-wrapper">
    <Navigator />
    <Divider orientation="vertical" sx={{ borderColor: 'white', height: '100%' }} />
    <div>Gal</div>
  </div>
);

export default Inventory;
