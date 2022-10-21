import React from 'react';
import './WatchList.css';
import WatchListContainer from './WatchListContainer';
import DashboardHeader from '../../../components/DashboardNavBar/DashboardHeader';

interface Props {}

const WatchList: React.FC<Props> = () => {
  // const { id } = useParams<RouteParams>();
  // const assetViewModel = new AssetViewModel();

  return (
    <>
      <DashboardHeader />
      <div className="App">
        <div className="App-header">
          <h1>Watchlist</h1>
          <WatchListContainer />
        </div>
      </div>
    </>
  );
};

export default WatchList;
