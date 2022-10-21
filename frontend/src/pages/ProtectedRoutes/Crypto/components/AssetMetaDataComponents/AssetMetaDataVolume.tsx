import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AssetViewModel from '../../AssetViewModel';

interface Props {
  viewModel: AssetViewModel;
}

const AssetMetaDataVolume: React.FC<Props> = (props) => {
  const { viewModel } = props;
  return (
    <TableRow>
      <TableCell sx={{ color: 'white' }} variant="head">
        <h4>Volume (24h)</h4>
      </TableCell>
      <TableCell sx={{ color: 'white' }}>
        <h3>${viewModel.assetModel.volume_24h}</h3>
      </TableCell>
    </TableRow>
  );
};
export default AssetMetaDataVolume;
