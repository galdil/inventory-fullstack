import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const FilterSelection = ({ filterValues, handleFilterChange }: FilterSelectionProps): JSX.Element => {
  const [filters, setFilters] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof filters>): void => {
    const { target: { value } } = event;
    const filtersArray = typeof value === 'string' ? value.split(',') : value;
    handleFilterChange(filtersArray);
    setFilters(filtersArray);
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
