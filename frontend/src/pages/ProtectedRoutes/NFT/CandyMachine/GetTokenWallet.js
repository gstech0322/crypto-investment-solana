import { web3 } from '@project-serum/anchor';
import { SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID } from './helpers';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const getTokenWallet = async (wallet, mint) => {
  return (
    await web3.PublicKey.findProgramAddress(
      [wallet.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )
  )[0];
};

export default getTokenWallet;
