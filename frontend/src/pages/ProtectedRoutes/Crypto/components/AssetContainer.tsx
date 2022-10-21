import React from 'react';
import Grid from '@mui/material/Grid';
import AssetQuickStats from './AssetQuickStats';
import AssetMetaData from './AssetMetaData';
import AssetPriceChart from './AssetPriceChart';
import AssetViewModel from '../AssetViewModel';
import { IAssetModel } from '../Interface/IAssetModel';

interface Props {
  viewModel: AssetViewModel;
  id: string;
}

interface IMarketDataObj {
  Timestamp: string;
  Prices: number;
}

const AssetContainer: React.FC<Props> = (props) => {
  const [asset, setAsset] = React.useState<IAssetModel[]>([]);
  const [market_chart_data, setMarketChartData] = React.useState<
    IMarketDataObj[]
  >([]);
  const { viewModel, id } = props;

  React.useEffect(() => {
    viewModel.setAssetName(id);
    async function fetchData() {
      viewModel.getAsset.then((data) => {
        if (data) {
          setAsset(data);
        }
      });
    }
    async function fetchPrices() {
      viewModel.getAssetPriceChart.then((data) => {
        if (data) {
          setMarketChartData(data);
        }
      });
    }

    fetchData();
    fetchPrices();
  }, [asset, id, viewModel]);

  return (
    <>
      <span className="header-asset">
        <img
          src={viewModel.assetModel.logo}
          alt={viewModel.assetModel.name}
          className="logo"
        />
        <h1>
          {viewModel.assetModel.name} {viewModel.assetModel.symbol}
        </h1>
        <AssetQuickStats viewModel={viewModel} />
      </span>
      <div className="container">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <AssetPriceChart
            viewModel={viewModel}
            market_chart_data={market_chart_data}
          />
          <AssetMetaData viewModel={viewModel} />
        </Grid>
      </div>
    </>
  );
};

export default AssetContainer;
