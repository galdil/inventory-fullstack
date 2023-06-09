import { useState, useEffect } from 'react';
import Gateway from '@src/api/gateway';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';
import FilterSelection from '@components/FilterSelection/FilterSelection';

import { SortOrder, type Product, ProductsFields } from '@common/sharedTypes';
import { ProductTableProps, QueryParamsObj, ProductFilters } from './types';
import { toTitleCase, convertToQueryString } from '../../common/utils';

import './productsTable.css';

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
  const [filtersObj, setFiltersObj] = useState<ProductFilters>({});

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

  const handleFilterChange = (field: ProductsFields, filters: string[]): void => {
    const newFiltersObj = {
      ...filtersObj,
      [field]: filters,
    };
    if (!filters.length) {
      delete newFiltersObj[field];
    }

    setFiltersObj(newFiltersObj);
  };

  useEffect(() => {
    const fetchProductData = async (): Promise<void> => {
      const filtersStr = convertToQueryString(filtersObj);
      const response = await Gateway.getProductsByType(selectedProductType, queryParams, filtersStr);
      const productsRes = response?.data;
      setProductsData(productsRes);
    };
    if (selectedProductType) {
      fetchProductData();
    }
  }, [selectedProductType, queryParams, filtersObj]);

  useEffect(() => {
    const fetchProductData = async (): Promise<void> => {
      const response = await Gateway.getProductsFiltersValuesByType(selectedProductType);
      const filtersValuesRes = response?.data;
      setFiltersValues(filtersValuesRes);
      setFiltersObj({});
    };
    if (selectedProductType) {
      fetchProductData();
    }
  }, [selectedProductType]);

  const renderTableHeader = (): JSX.Element => (
    <TableHead sx={{ background: 'lightgreen' }}>
      <TableRow
        key="table-header"
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        {filtersValues ? (Object.keys(filtersValues) as ProductsFields[]).map((field) => {
          const sanitizedField = toTitleCase(field);
          return (
            <TableCell key={field}>
              <TableSortLabel
                onClick={(): void => createSortHandler(field)}
                active={sortBy === field}
                direction={sortBy === field ? sortOrder : SortOrder.ASC}
              >
                {sanitizedField}
              </TableSortLabel>
              <FilterSelection
                filterValues={filtersValues?.[field] || []}
                handleFilterChange={(filters): void => handleFilterChange(field, filters)}
              />
            </TableCell>
          );
        }) : <TableCell />}
      </TableRow>
    </TableHead>
  );

  const renderTableBody = (): JSX.Element => (
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
  );

  return (
    <div className="table-wrapper">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: '1000px', overflow: 'scroll' }} aria-label="simple table">
          {renderTableHeader()}
          {renderTableBody()}
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
