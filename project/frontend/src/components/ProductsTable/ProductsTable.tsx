import { useState, useEffect } from 'react';
import Gateway from '@src/api/gateway';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import FilterSelection from '@components/FilterSelection/FilterSelection';

import { SortOrder, type Product, ProductsFields } from '@common/sharedTypes';
import { toTitleCase } from '../../common/utils';

import { ProductTableProps, QueryParamsObj } from './types';

const defaultPaging = {
  page: '1',
  items: '5',
};

const defaultRowPerPage = 5;

const ProductsTable = ({ selectedProductType, currentProductCount }: ProductTableProps): JSX.Element => {
  const [page, setPage] = useState<number>(0);
  const [sortBy, setSortBy] = useState<ProductsFields>();
  const [sortOrder, setSortOrder] = useState<SortOrder>();
  const [productsData, setProductsData] = useState<Product[]>();
  const [filtersValues, setFiltersValues] = useState<Record<ProductsFields, any>>();
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowPerPage);
  const [queryParams, setQueryParams] = useState<QueryParamsObj>(defaultPaging);

  const handleQueryChange = (queryParamsObj: QueryParamsObj): void => {
    setQueryParams({ ...queryParams, ...queryParamsObj });
  };

  const createSortHandler = (field: ProductsFields): void => {
    const isAsc = sortBy === field && sortOrder === SortOrder.ASC;
    const sortOrderState = isAsc ? SortOrder.DESC : SortOrder.ASC;
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

  useEffect(() => {
    const fetchProductData = async (): Promise<void> => {
      const response = await Gateway.getProductsByType(selectedProductType, queryParams);
      const productsRes = response?.data;
      setProductsData(productsRes);
    };
    if (selectedProductType) {
      fetchProductData();
    }
  }, [selectedProductType, queryParams]);

  useEffect(() => {
    const fetchProductData = async (): Promise<void> => {
      const response = await Gateway.getProductsFiltersValuesByType(selectedProductType);
      const filtersValuesRes = response?.data;
      setFiltersValues(filtersValuesRes);
    };
    if (selectedProductType) {
      fetchProductData();
    }
  }, [selectedProductType]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: '1000px', overflow: 'scroll' }} aria-label="simple table">
          <TableHead sx={{ background: 'lightgreen' }}>
            <TableRow
              key={productsData?.[0].name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {productsData && Object.keys(productsData[0]).map((field) => {
                const sanitizedField = toTitleCase(field);
                return (
                  <TableCell key={field}>
                    <TableSortLabel
                      onClick={(): void => createSortHandler(field as ProductsFields)}
                      active={sortBy === field}
                      direction={sortBy === field ? sortOrder : SortOrder.ASC}
                    >
                      {sanitizedField}
                    </TableSortLabel>
                    <FilterSelection filterValues={filtersValues?.[field as ProductsFields] || []} />
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {productsData?.map((row) => (
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
        count={currentProductCount}
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
