import React from 'react';
import AssetsViewModel from './AssetsViewModel';
import AssetsTableView from './components/AssetsTableView';
import './Assets.css';
import DashboardHeader from '../../../components/DashboardNavBar/DashboardHeader';

interface Props {}

const Assets: React.FC<Props> = () => {
  const assetsViewModel = new AssetsViewModel();
  return (
    <>
      <DashboardHeader />
      <div className="App">
        <header className="App-header">
          <AssetsTableView viewModel={assetsViewModel} />
        </header>
      </div>
    </>
  );
};

export default Assets;
