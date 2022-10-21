import { web3 } from '@project-serum/anchor';
import { programs } from '@metaplex/js';

const MAX_NAME_LENGTH = 32;
const MAX_URI_LENGTH = 200;
const MAX_SYMBOL_LENGTH = 10;
const MAX_CREATOR_LEN = 32 + 1 + 1;

const {
  metadata: { Metadata, MetadataProgram },
} = programs;

// Actions
const fetchHashTable = async (hash, metadataEnabled) => {
  const connection = new web3.Connection(process.env.REACT_APP_SOLANA_RPC_HOST);

  const metadataAccounts = await MetadataProgram.getProgramAccounts(
    connection,
    {
      filters: [
        {
          memcmp: {
            offset:
              1 +
              32 +
              32 +
              4 +
              MAX_NAME_LENGTH +
              4 +
              MAX_URI_LENGTH +
              4 +
              MAX_SYMBOL_LENGTH +
              2 +
              1 +
              4 +
              0 * MAX_CREATOR_LEN,
            bytes: hash,
          },
        },
      ],
    }
  );

  const mintHashes = [];

  for (let index = 0; index < metadataAccounts.length; index++) {
    const account = metadataAccounts[index];
    const accountInfo = await connection.getParsedAccountInfo(account.pubkey);
    const metadata = new Metadata(hash.toString(), accountInfo.value);
    if (metadataEnabled) mintHashes.push(metadata.data);
    else mintHashes.push(metadata.data.mint);
  }

  return mintHashes;
};

export default fetchHashTable;
