import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AssetViewModel from '../../AssetViewModel';

interface Props {
  viewModel: AssetViewModel;
}

const AssetMetaDataSymbol: React.FC<Props> = (props) => {
  const { viewModel } = props;
  return (
    <TableRow>
      <TableCell sx={{ color: 'white' }} variant="head">
        <h4>Symbol</h4>
      </TableCell>
      <TableCell sx={{ color: 'white' }}>
        <h3>{viewModel.assetModel.symbol}</h3>
      </TableCell>
    </TableRow>
  );
};
export default AssetMetaDataSymbol;
