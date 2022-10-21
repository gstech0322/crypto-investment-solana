// Candy Machine Boiler template
import React, { useEffect } from 'react';
import { Connection } from '@solana/web3.js';
import { Program, web3 } from '@project-serum/anchor';
import { MintLayout, TOKEN_PROGRAM_ID, Token } from '@solana/spl-token';
import '../NFT.css';
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks';
import {
  setMetaplexCancyMachineStats,
  setMintedItems,
} from '../../../../redux/nftReducer';
import { candyMachineProgram, TOKEN_METADATA_PROGRAM_ID } from './helpers';

import getProvider from './GetProvider';
import getTokenWallet from './GetTokenWallet';
import getMetadata from './GetMetaData';
import getMasterEdition from './GetMasterEdition';
import createAssociatedTokenAccountInstruction from './AssociatedTokenAccountsInstr';
import fetchHashTable from './FetchHashTable';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const config = new web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_CONFIG);
const { SystemProgram } = web3;

const style = {
  bgcolor: '#151518',
  borderRadius: '10px',
  boxShadow: 10,
  color: 'white',
  height: '200px',
  width: '48%',
};

const RenderMintedItems = () => {
  const mintedItems = useAppSelector((state) => state.nft.mintedItems);

  return (
    <div className="minted-items-images-container">
      <div className="img-grid">
        {mintedItems.map((mint) => (
          <div className="img-item" key={mint.title}>
            <img src={mint.image} alt={`Minted NFT ${mint}`} />
            <Card sx={style}>
              <CardContent>
                <h4>{mint.name}</h4>
              </CardContent>
              <CardContent>
                <h4>{mint.description}</h4>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

const CandyMachine = ({ walletAddress }) => {
  const [isMinting, setIsMinting] = React.useState(false);
  const [isLoadingMints, setIsLoadingMints] = React.useState(false);
  const dispatch = useAppDispatch();
  const machineStats = useAppSelector((state) => state.nft.machineStats);
  const mintedItems = useAppSelector((state) => state.nft.mintedItems);

  useEffect(() => {
    getCandyMachineState();
  }, []);

  // Get the candy machine state
  const getCandyMachineState = async () => {
    const provider = getProvider();

    // get metadata of the deployed candy machine from solana like a fetching a DB
    const metadata = await Program.fetchIdl(candyMachineProgram, provider);

    // creating a program object for the candy machine
    const program = new Program(metadata, candyMachineProgram, provider);

    // get the metadata of the NFTs of the candy machine from Solana devnet
    const candyMachine = await program.account.candyMachine.fetch(
      process.env.REACT_APP_CANDY_MACHINE_ID
    );

    // Parse through all the metadata and log it out
    const itemsAvailableInMachine = candyMachine.data.itemsAvailable.toNumber();
    const itemsRedeemedInMachine = candyMachine.itemsRedeemed.toNumber();
    const itemsRemainingInMachine =
      itemsAvailableInMachine - itemsRedeemedInMachine;
    const getLiveMachineData = candyMachine.data.goLiveDate.toNumber();

    // convert the timestamp to a date
    const liveMachineData = new Date(getLiveMachineData * 1000);
    const liveMachineDataFormatted = liveMachineData.toLocaleString();
    dispatch(
      setMetaplexCancyMachineStats({
        itemsAvailableInMachine,
        itemsRedeemedInMachine,
        itemsRemainingInMachine,
        getLiveMachineData,
        liveMachineDataFormatted,
      })
    );
    setIsLoadingMints(true);
    const data = await fetchHashTable(
      process.env.REACT_APP_CANDY_MACHINE_ID,
      true
    );
    if (data.length !== 0) {
      for (const mint of data) {
        // URI
        const res = await fetch(mint.data.uri);
        const parse_res = await res.json();
        console.log('Minted NFTs:', mint);

        if (!mintedItems.find((item) => item === parse_res.image)) {
          dispatch(
            setMintedItems({
              image: parse_res.image,
              name: parse_res.name,
              description: parse_res.description,
            })
          );
        }
      }
    }
    setIsLoadingMints(false);
  };

  const mintToken = async () => {
    try {
      setIsMinting(true);
      const mint = web3.Keypair.generate();
      const token = await getTokenWallet(
        walletAddress.publicKey,
        mint.publicKey
      );
      const metadata = await getMetadata(mint.publicKey);
      const masterEdition = await getMasterEdition(mint.publicKey);
      const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST;
      const connection = new Connection(rpcHost);
      const rent = await connection.getMinimumBalanceForRentExemption(
        MintLayout.span
      );

      const accounts = {
        config,
        candyMachine: process.env.REACT_APP_CANDY_MACHINE_ID,
        payer: walletAddress.publicKey,
        wallet: process.env.REACT_APP_TREASURY_ADDRESS,
        mint: mint.publicKey,
        metadata,
        masterEdition,
        mintAuthority: walletAddress.publicKey,
        updateAuthority: walletAddress.publicKey,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: web3.SYSVAR_RENT_PUBKEY,
        clock: web3.SYSVAR_CLOCK_PUBKEY,
      };

      const signers = [mint];
      const instructions = [
        web3.SystemProgram.createAccount({
          fromPubkey: walletAddress.publicKey,
          newAccountPubkey: mint.publicKey,
          space: MintLayout.span,
          lamports: rent,
          programId: TOKEN_PROGRAM_ID,
        }),
        Token.createInitMintInstruction(
          TOKEN_PROGRAM_ID,
          mint.publicKey,
          0,
          walletAddress.publicKey,
          walletAddress.publicKey
        ),
        createAssociatedTokenAccountInstruction(
          token,
          walletAddress.publicKey,
          walletAddress.publicKey,
          mint.publicKey
        ),
        Token.createMintToInstruction(
          TOKEN_PROGRAM_ID,
          mint.publicKey,
          token,
          walletAddress.publicKey,
          [],
          1
        ),
      ];

      const provider = getProvider();
      const idl = await Program.fetchIdl(candyMachineProgram, provider);
      const program = new Program(idl, candyMachineProgram, provider);

      const txn = await program.rpc.mintNft({
        accounts,
        signers,
        instructions,
      });

      console.log('txn:', txn);

      // Setup listener
      connection.onSignatureWithOptions(
        txn,
        async (notification, context) => {
          if (notification.type === 'status') {
            console.log('Receievd status event');

            const { result } = notification;
            if (!result.err) {
              console.log('NFT Minted!');
              setIsMinting(false);
              await getCandyMachineState();
            }
          }
        },
        { commitment: 'processed' }
      );
    } catch (error) {
      let message = error.msg || 'Minting failed! Please try again!';
      setIsMinting(false);
      if (!error.msg) {
        if (error.message.indexOf('0x138')) {
        } else if (error.message.indexOf('0x137')) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf('0x135')) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      console.warn(message);
    }
  };
  const NFT_MINT_BUTTON_TEXT = 'Mint NFT';
  const NFT_MINT_BUTTON_TEXT_DISABLED = 'Minting...';
  return (
    machineStats && (
      <>
        <div className="machine-stats-container">
          <h5>Details</h5>
          {/* <h4
            style={{ fontSize: 16 }}
          >{`Drop Date: ${machineStats.liveMachineDataFormatted}`}</h4> */}
          <h4
            style={{ fontSize: 20 }}
          >{`Items Minted: ${machineStats.itemsRedeemedInMachine} / ${machineStats.itemsAvailableInMachine}`}</h4>
          {machineStats.itemsRemainingInMachine > 0 ? (
            <>
              <button
                className="cta-button mint-button"
                onClick={mintToken}
                disabled={isMinting}
              >
                {!isMinting
                  ? NFT_MINT_BUTTON_TEXT
                  : NFT_MINT_BUTTON_TEXT_DISABLED}
              </button>
            </>
          ) : (
            <h4>SOLD OUT!</h4>
          )}
        </div>
        <div className="minted-items-container">
          {isLoadingMints ? (
            <>
              <h5>Loading Minted Items...</h5>
            </>
          ) : (
            <>
              <h5>Minted Items ✨</h5>
              {mintedItems.length > 0 && <RenderMintedItems />}
            </>
          )}
        </div>
      </>
    )
  );
};

export default CandyMachine;
