import TableCell from '@mui/material/TableCell';
import DiamondIcon from '@mui/icons-material/Diamond';
import AssetsViewModel from '../AssetsViewModel';

interface Props {
  viewModel: AssetsViewModel;
  name: string;
  is_in_watchlist: boolean;
}

const AssetsTableViewWatchList: React.FC<Props> = (props) => {
  const { viewModel, name, is_in_watchlist } = props;
  const check_watchlist = async () => {
    viewModel.check_watchlist(name);
  };
  return (
    <TableCell component="th" scope="row" onClick={check_watchlist}>
      {is_in_watchlist ? (
        <DiamondIcon sx={{ color: '#6DD5FA', cursor: 'pointer' }}></DiamondIcon>
      ) : (
        <DiamondIcon sx={{ color: 'gray', cursor: 'pointer' }}></DiamondIcon>
      )}
    </TableCell>
  );
};
export default AssetsTableViewWatchList;
