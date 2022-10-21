import React from 'react';
import DashboardHeader from '../../../components/DashboardNavBar/DashboardHeader';
import './NFT.css';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import {
  isPhantomConnected,
  checkIfPhantomFound,
} from '../../../redux/nftReducer';
import DisplayAlert from './components/DisplayAlert';
import ConnectPhantomButton from './components/ConnectPhantomButton';
import CandyMachine from './CandyMachine/CandyMachine';
import Grid from '@mui/material/Grid';

const NFT = () => {
  const isPhantomFound = useAppSelector((state) => state.nft.isPhantomFound);
  const walletAddress = useAppSelector((state) => state.nft.walletAddress);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const onPageLoad = async () => {
      dispatch(checkIfPhantomFound());
      dispatch(isPhantomConnected());
    };
    window.addEventListener('load', onPageLoad);
    return () => {
      window.removeEventListener('load', onPageLoad);
    };
  }, []);
  return (
    <>
      <DashboardHeader />
      <div className="App">
        <div className="App-header">
          <DisplayAlert
            isPhantomFound={isPhantomFound}
            walletAddress={walletAddress}
          />
          <h1>Crypto Trading NFT Drops &#x1F36C;</h1>
          {walletAddress ? (
            <>
              <div className="mint-container">
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <CandyMachine walletAddress={window.solana} />
                </Grid>
              </div>
            </>
          ) : (
            <ConnectPhantomButton />
          )}
        </div>
      </div>
    </>
  );
};
export default NFT;
