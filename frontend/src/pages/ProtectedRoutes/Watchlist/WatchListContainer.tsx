import React from 'react';
import Card from '@mui/material/Card';
import DiamondIcon from '@mui/icons-material/Diamond';
import './WatchList.css';
import WatchListViewModel from './WatchListViewModel';
import { IWatchListInterface } from './Interface/IWatchListInterface';

interface Props {}

const WatchListContainer: React.FC<Props> = () => {
  const [watchList, setWatchList] = React.useState<IWatchListInterface[]>([]);
  const watchlistViewModel = new WatchListViewModel();

  React.useEffect(() => {
    async function fetchData() {
      watchlistViewModel.getWatchlist.then((data) => {
        if (data) {
          setWatchList(data);
        }
      });
    }
    fetchData();
  }, [watchlistViewModel]);

  return (
    <div className="box-watchlist">
      {watchList.map((crypto) => {
        return (
          <div>
            <Card
              sx={{
                color: 'white',
                minWidth: 275,
                backgroundColor: '#121214',
                borderRadius: '10px',
              }}
            >
              <span className="elem-watchlist">
                <span className="elem">
                  <img
                    src={crypto.logo}
                    alt={crypto.name}
                    className="watchlist-logo"
                  />
                  <h3>{crypto.name}</h3>
                </span>
                <DiamondIcon
                  sx={{
                    color: '#6DD5FA',
                    cursor: 'pointer',
                    marginLeft: '10px',
                    height: '20px',
                  }}
                  // onClick={() => {
                  // 	viewModel.setSelectedAsset(asset);
                  // }}
                ></DiamondIcon>
              </span>
              <span className="elem-watchlist">
                <h5 className="watchlist-price-change">${crypto.price}</h5>
                {watchlistViewModel.isPositive(crypto.percent_change_24h) ? (
                  <h5 className="watchlist-price-change green-indicator">
                    {crypto.percent_change_24h}
                  </h5>
                ) : (
                  <h5 className="watchlist-price-change red-indicator">
                    {crypto.percent_change_24h}
                  </h5>
                )}
              </span>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default WatchListContainer;
