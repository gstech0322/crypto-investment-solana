import TableCell from '@mui/material/TableCell';
import AssetsViewModel from '../AssetsViewModel';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Props {
  percent_change_7d: string;
  viewModel: AssetsViewModel;
}

const AssetsTableView7d: React.FC<Props> = (props) => {
  const { viewModel, percent_change_7d } = props;
  return (
    <>
      {viewModel.isPositive(percent_change_7d) ? (
        <TableCell sx={{ color: 'green' }}>
          <span className="elem indicator">
            <ArrowDropUpIcon />
            <h4>{percent_change_7d}</h4>
          </span>
        </TableCell>
      ) : (
        <TableCell sx={{ color: 'red' }}>
          <span className="elem indicator">
            <ArrowDropDownIcon />
            <h4>{percent_change_7d}</h4>
          </span>
        </TableCell>
      )}
    </>
  );
};
export default AssetsTableView7d;
