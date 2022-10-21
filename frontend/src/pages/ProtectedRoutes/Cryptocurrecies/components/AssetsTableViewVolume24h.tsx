import TableCell from '@mui/material/TableCell';

interface Props {
  volume: string;
}

const AssetsTableViewVolume24h: React.FC<Props> = (props) => {
  const { volume } = props;
  return (
    <TableCell sx={{ color: 'white' }}>
      <h4>${volume}</h4>
    </TableCell>
  );
};
export default AssetsTableViewVolume24h;
