import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ProductTableProps } from './types';

const toTitleCase = (str: string): string => (
  str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())
);

const ProductsTable = ({ data }: ProductTableProps): JSX.Element => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: '1000px', overflow: 'scroll' }} aria-label="simple table">
      <TableHead sx={{ background: 'lightgreen' }}>
        <TableRow
          key={data?.[0].name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          {data && Object.keys(data[0]).map((field) => (
            <TableCell>{toTitleCase(field)}</TableCell>
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
              <TableCell>{value.toString()}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ProductsTable;
