import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AssetViewModel from '../../AssetViewModel';
import { Link } from 'react-router-dom';

interface Props {
  viewModel: AssetViewModel;
}

const AssetMetaDataHomePage: React.FC<Props> = (props) => {
  const { viewModel } = props;
  return (
    <TableRow>
      <TableCell sx={{ color: 'white' }} variant="head">
        <h4>Hompage</h4>
      </TableCell>
      <TableCell sx={{ color: 'white' }}>
        <Link
          className="link1"
          to={{
            pathname: `https://${viewModel.assetModel.homepage.split('/')[2]}`,
          }}
          target="_blank"
        >
          <h3>{viewModel.assetModel.name} Website</h3>
        </Link>
      </TableCell>
    </TableRow>
  );
};
export default AssetMetaDataHomePage;
