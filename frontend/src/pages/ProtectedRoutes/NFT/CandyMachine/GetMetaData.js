import { PublicKey } from '@solana/web3.js';
import { TOKEN_METADATA_PROGRAM_ID } from './helpers';

const getMetadata = async (mint) => {
  return (
    await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )
  )[0];
};

export default getMetadata;
