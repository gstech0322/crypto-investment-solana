import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AssetViewModel from '../../AssetViewModel';

interface Props {
  viewModel: AssetViewModel;
}

const AssetMetaDataName: React.FC<Props> = (props) => {
  const { viewModel } = props;
  return (
    <TableRow>
      <TableCell sx={{ color: 'white' }} variant="head">
        <h4>Name</h4>
      </TableCell>
      <TableCell sx={{ color: 'white' }}>
        <h3>{viewModel.assetModel.name}</h3>
      </TableCell>
    </TableRow>
  );
};
export default AssetMetaDataName;
