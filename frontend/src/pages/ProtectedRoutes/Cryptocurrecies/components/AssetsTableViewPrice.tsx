import TableCell from '@mui/material/TableCell';

interface Props {
  price: string;
}

const AssetsTableViewPrice: React.FC<Props> = (props) => {
  const { price } = props;
  return (
    <TableCell sx={{ color: 'white' }}>
      <h4>${price}</h4>
    </TableCell>
  );
};
export default AssetsTableViewPrice;
