import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useState } from 'react';
import { ProductTableProps } from './types';

import { type Product, type SortOrder } from '../../../../common/sharedTypes';

const toTitleCase = (str: string): string => (
  str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())
);

const ProductsTable = ({ data, handleQueryChange }: ProductTableProps): JSX.Element => {
  const [sortBy, setSortBy] = useState<keyof Product>();
  const [sortOrder, setSortOrder] = useState<SortOrder>();

  const createSortHandler = (field: keyof Product): void => {
    const isAsc = sortBy === field && sortOrder === 'asc';
    const sortOrderState = isAsc ? 'desc' : 'asc';
    setSortOrder(sortOrderState);
    setSortBy(field);
    handleQueryChange({ sortBy: field, sortOrder: sortOrderState });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '1000px', overflow: 'scroll' }} aria-label="simple table">
        <TableHead sx={{ background: 'lightgreen' }}>
          <TableRow
            key={data?.[0].name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            {data && Object.keys(data[0]).map((field) => (
              <TableCell key={field}>
                <TableSortLabel
                  onClick={(): void => createSortHandler(field as keyof Product)}
                  active={sortBy === field}
                  direction={sortBy === field ? sortOrder : 'asc'}
                >
                  {toTitleCase(field)}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {Object.values(row).map((value) => (
                <TableCell key={`${row.name}_${value}`}>{value.toString()}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
