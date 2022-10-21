import TableCell from '@mui/material/TableCell';

interface Props {
  market_cap: string;
}

const AssetsTableViewMarketCap: React.FC<Props> = (props) => {
  const { market_cap } = props;
  return (
    <TableCell sx={{ color: 'white' }}>
      <h4>${market_cap}</h4>
    </TableCell>
  );
};
export default AssetsTableViewMarketCap;
