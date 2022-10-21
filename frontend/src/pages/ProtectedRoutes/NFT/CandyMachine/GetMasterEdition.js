import { PublicKey } from '@solana/web3.js';
import { TOKEN_METADATA_PROGRAM_ID } from './helpers';

const getMasterEdition = async (mint) => {
  return (
    await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
        Buffer.from('edition'),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )
  )[0];
};

export default getMasterEdition;
