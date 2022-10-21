import React from 'react';
import AssetsViewModel from '../AssetsViewModel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { IAssetsModel } from '../Interface/IAssetsModel';
import AssetsTableViewHeader from './AssetsTableViewHeader';
import AssetsTableViewVolume24h from './AssetsTableViewVolume24h';
import AssetsTableViewMarketCap from './AssetsTableViewMarketCap';
import AssetsTableView7d from './AssetsTableView7d';
import AssetsTableView24h from './AssetsTableView24h';
import AssetsTableViewPrice from './AssetsTableViewPrice';
import AssetsTableViewName from './AssetsTableViewName';
import AssetsTableViewRank from './AssetsTableViewRank';
import AssetsTableViewWatchList from './AssetsTableViewWatchList';

interface Props {
  viewModel: AssetsViewModel;
}

const AssetsTableView: React.FC<Props> = (props: Props) => {
  const [assetList, setAssets] = React.useState<IAssetsModel[]>([]);
  const { viewModel } = props;

  React.useEffect(() => {
    async function fetchData() {
      viewModel.getAssets.then((data) => {
        if (data) {
          setAssets(data);
        }
      });
    }
    fetchData();
  }, [viewModel]);

  return (
    <>
      <h1>Top 15 Cryptocurrencies</h1>
      <div className="box">
        <TableContainer>
          <Table
            size="small"
            aria-label="small table"
            sx={{ borderBottom: 'none' }}
          >
            <caption style={{ color: 'white' }}>
              <h3>Top 15 Cryptocurrency Table</h3>
            </caption>
            <AssetsTableViewHeader />
            <TableBody>
              {assetList.map((asset) => (
                <TableRow key={asset.rank}>
                  <AssetsTableViewWatchList
                    viewModel={viewModel}
                    name={asset.id}
                    is_in_watchlist={asset.is_in_watchlist}
                  />
                  <AssetsTableViewRank rank={asset.rank} />
                  <AssetsTableViewName
                    id={asset.id}
                    name={asset.name}
                    symbol={asset.symbol}
                    logo={asset.logo}
                  />
                  <AssetsTableViewPrice price={asset.price} />
                  <AssetsTableView24h
                    percent_change_24h={asset.percent_change_24h}
                    viewModel={viewModel}
                  />
                  <AssetsTableView7d
                    percent_change_7d={asset.percent_change_7d}
                    viewModel={viewModel}
                  />
                  <AssetsTableViewMarketCap market_cap={asset.market_cap} />
                  <AssetsTableViewVolume24h volume={asset.volume_24h} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default AssetsTableView;
