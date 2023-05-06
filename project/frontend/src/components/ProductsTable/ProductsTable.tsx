import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useState } from 'react';
import { ProductTableProps } from './types';

import { type Product, type SortOrder } from '../../../../common/sharedTypes';

const toTitleCase = (str: string): string => (
  str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())
);

enum OrderOptions {
  ASC = 'asc',
  DESC = 'desc',
}

const ProductsTable = ({ data, handleQueryChange, productCount }: ProductTableProps): JSX.Element => {
  const [sortBy, setSortBy] = useState<keyof Product>();
  const [sortOrder, setSortOrder] = useState<SortOrder>();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const createSortHandler = (field: keyof Product): void => {
    const isAsc = sortBy === field && sortOrder === OrderOptions.ASC;
    const sortOrderState = isAsc ? OrderOptions.DESC : OrderOptions.ASC;
    setSortOrder(sortOrderState);
    setSortBy(field);
    handleQueryChange({ sortBy: field, sortOrder: sortOrderState });
  };

  const handleChangePage = (e: unknown, pageSelected: number): void => {
    const pageToQuery = (pageSelected + 1).toString();
    handleQueryChange({ page: pageToQuery, items: rowsPerPage.toString() });
    setPage(pageSelected);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const itemsPerPage = event.target.value;
    handleQueryChange({ page: '1', items: itemsPerPage });
    setPage(0);
    setRowsPerPage(parseInt(itemsPerPage, 10));
  };

  return (
    <div>
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
                    direction={sortBy === field ? sortOrder : OrderOptions.ASC}
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={productCount}
        rowsPerPage={rowsPerPage}
        page={page}
        sx={{ color: 'white' }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ProductsTable;
