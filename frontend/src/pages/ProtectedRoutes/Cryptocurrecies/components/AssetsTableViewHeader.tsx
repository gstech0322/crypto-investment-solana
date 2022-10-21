import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { TableHead } from '@mui/material';

interface Props {}

const AssetsTableViewHeader: React.FC<Props> = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell sx={{ color: 'white' }}>
          <h3>Rank</h3>
        </TableCell>
        <TableCell sx={{ color: 'white' }}>
          <h3>Name</h3>
        </TableCell>
        <TableCell sx={{ color: 'white' }}>
          <h3>Price</h3>
        </TableCell>
        <TableCell sx={{ color: 'white' }}>
          <h3>24h%</h3>
        </TableCell>
        <TableCell sx={{ color: 'white' }}>
          <h3>7d%</h3>
        </TableCell>
        <TableCell sx={{ color: 'white' }}>
          <h3>Market Cap</h3>
        </TableCell>
        <TableCell sx={{ color: 'white' }}>
          <h3>Volume (24h)</h3>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
export default AssetsTableViewHeader;
