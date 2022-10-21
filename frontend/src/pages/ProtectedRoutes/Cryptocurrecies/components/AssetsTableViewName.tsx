import TableCell from '@mui/material/TableCell';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
  name: string;
  logo: string;
  symbol: string;
}

const AssetsTableViewPrice: React.FC<Props> = (props) => {
  const { id, name, logo, symbol } = props;
  return (
    <TableCell component="th" scope="row">
      <Link to={`/cryptocurrencies/${id}`} className="link elem">
        <img src={logo} alt={name} className="table-asset-logo" />
        <h4>
          {name} {symbol}
        </h4>
      </Link>
    </TableCell>
  );
};
export default AssetsTableViewPrice;
