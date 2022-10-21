import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AssetViewModel from '../../AssetViewModel';

interface Props {
  viewModel: AssetViewModel;
}

const AssetMetaDataAth: React.FC<Props> = (props) => {
  const { viewModel } = props;
  return (
    <TableRow>
      <TableCell sx={{ color: 'white' }} variant="head">
        <h4>All time high</h4>
      </TableCell>
      <TableCell sx={{ color: 'white' }}>
        <h3>${viewModel.assetModel.all_time_high}</h3>
      </TableCell>
    </TableRow>
  );
};
export default AssetMetaDataAth;
