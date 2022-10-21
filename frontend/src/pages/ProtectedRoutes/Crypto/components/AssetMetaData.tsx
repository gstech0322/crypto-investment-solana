import React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import AssetViewModel from '../AssetViewModel';
import Card from '@mui/material/Card';
import AssetMetaDataRank from './AssetMetaDataComponents/AssetMetaDataRank';
import AssetMetaDataName from './AssetMetaDataComponents/AssetMetaDataName';
import AssetMetaDataSymbol from './AssetMetaDataComponents/AssetMetaDataSymbol';
import AssetMetaDataCurrentPrice from './AssetMetaDataComponents/AssetMetaDataCurrentPrice';
import AssetMetaDataChange24 from './AssetMetaDataComponents/AssetMetaDataChange24';
import AssetMetaDataChange7 from './AssetMetaDataComponents/AssetMetaDataChange7';
import AssetMetaDataMarketCap from './AssetMetaDataComponents/AssetMetaDataMarketCap';
import AssetMetaDataVolume from './AssetMetaDataComponents/AssetMetaDataVolume';
import AssetMetaDataAth from './AssetMetaDataComponents/AssetMetaDataAth';
import AssetMetaDataAtl from './AssetMetaDataComponents/AssetMetaDataAtl';
import AssetMetaDataHomePage from './AssetMetaDataComponents/AssetMetaDataHomePage';

interface Props {
  viewModel: AssetViewModel;
}

const AssetMetaData: React.FC<Props> = (props) => {
  const { viewModel } = props;
  return (
    <div className="asset-stats">
      <TableContainer>
        <Card
          sx={{
            color: 'white',
            bgcolor: '#121214',
            borderRadius: '10px',
          }}
        >
          <h4>{viewModel.assetModel.name} Stats</h4>
        </Card>
        <Table size="small" aria-label="small table">
          <caption style={{ color: 'white' }}>
            <h3>{viewModel.assetModel.name} Stats</h3>
          </caption>
          <TableHead>
            <AssetMetaDataRank viewModel={viewModel} />
            <AssetMetaDataName viewModel={viewModel} />
            <AssetMetaDataSymbol viewModel={viewModel} />
            <AssetMetaDataCurrentPrice viewModel={viewModel} />
            <AssetMetaDataChange24 viewModel={viewModel} />
            <AssetMetaDataChange7 viewModel={viewModel} />
            <AssetMetaDataMarketCap viewModel={viewModel} />
            <AssetMetaDataVolume viewModel={viewModel} />
            <AssetMetaDataAth viewModel={viewModel} />
            <AssetMetaDataAtl viewModel={viewModel} />
            <AssetMetaDataHomePage viewModel={viewModel} />
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AssetMetaData;
