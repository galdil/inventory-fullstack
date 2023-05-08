import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const FilterSelection = ({ filterValues }: FilterSelectionProps): JSX.Element => {
  const [filters, setFilters] = useState<any>([]);

  const handleChange = (event: SelectChangeEvent<typeof filters>): void => {
    const {
      target: { value },
    } = event;
    setFilters(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div style={{ width: '150px' }}>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <Select
          multiple
          displayEmpty
          value={filters}
          onChange={handleChange}
          renderValue={(selected): string | JSX.Element => {
            if (selected.length === 0) {
              return <em>Filter</em>;
            }

            return selected.join(', ');
          }}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Filter</em>
          </MenuItem>
          {filterValues.map((option) => (
            <MenuItem
              key={option}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterSelection;
