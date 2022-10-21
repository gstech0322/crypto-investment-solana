import { Connection } from '@solana/web3.js';
import { Provider } from '@project-serum/anchor';

const opts = {
  preflightCommitment: 'processed',
};

// Provider for the candy machine
// It will let our client connect to Solana and mint NFTs on the candy machine
const getProvider = () => {
  const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST;

  //new connection object
  const connection = new Connection(rpcHost);

  // new provider object
  const provider = new Provider(
    connection,
    window.solana,
    opts.preflightCommitment
  );
  return provider;
};

export default getProvider;
