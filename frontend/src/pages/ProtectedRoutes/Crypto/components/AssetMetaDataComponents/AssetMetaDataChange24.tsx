import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AssetViewModel from '../../AssetViewModel';

interface Props {
  viewModel: AssetViewModel;
}

const AssetMetaDataChange24: React.FC<Props> = (props) => {
  const { viewModel } = props;
  return (
    <TableRow>
      <TableCell sx={{ color: 'white' }} variant="head">
        <h4>24h% Change</h4>
      </TableCell>
      {viewModel.isPositive(viewModel.assetModel.percent_change_24h) ? (
        <TableCell sx={{ color: 'green' }}>
          <h3>{viewModel.assetModel.percent_change_24h}%</h3>
        </TableCell>
      ) : (
        <TableCell sx={{ color: 'red' }}>
          <h3>{viewModel.assetModel.percent_change_24h}%</h3>
        </TableCell>
      )}
    </TableRow>
  );
};
export default AssetMetaDataChange24;
