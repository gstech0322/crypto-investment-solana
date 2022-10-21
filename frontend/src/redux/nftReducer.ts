import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface Mint {
  mintedItems: string;
}

// state for the nft reducer
interface NFTState {
  walletAddress: string;
  isPhantomFound: boolean;
  machineStats: {
    itemsAvailableInMachine: number;
    itemsRedeemedInMachine: number;
    itemsRemainingInMachine: number;
    getLiveMachineData: number;
    liveMachineDataFormatted: number;
  };
  mintedItems: Mint[];
}

const initialState: NFTState = {
  walletAddress: '',
  isPhantomFound: false,
  machineStats: {
    itemsAvailableInMachine: 0,
    itemsRedeemedInMachine: 0,
    itemsRemainingInMachine: 0,
    getLiveMachineData: 0,
    liveMachineDataFormatted: 0,
  },
  mintedItems: [],
};

declare global {
  interface Window {
    solana: any;
  }
}

export const isPhantomConnected = createAsyncThunk(
  'nft/solanaConnect',
  async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          const res = await solana.connect({ onlyIfTrue: true });
          return res.publicKey.toString();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const connectPhantom = createAsyncThunk(
  'nft/solanaConnectPhantom',
  async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          const res = await solana.connect();
          return res.publicKey.toString();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const NFTSlice = createSlice({
  name: 'NFTStates',
  // state variables that hold the data of the app
  initialState,
  // reducers: returns some new state based on the action
  reducers: {
    // actions: actions that actually changes the state (mutating logic)
    checkIfPhantomFound: (state, action) => {
      try {
        const { solana } = window;
        if (solana) {
          if (solana.isPhantom) {
            state.isPhantomFound = true;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    setMetaplexCancyMachineStats: (state, action) => {
      state.machineStats = {
        ...action.payload,
      };
    },
    setMintedItems: (state, action) => {
      state.mintedItems.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    // extra reducers for specific actions
    builder.addCase(isPhantomConnected.fulfilled, (state, action) => {
      state.walletAddress = action.payload;
      state.isPhantomFound = true;
    });
    builder.addCase(connectPhantom.fulfilled, (state, action) => {
      state.walletAddress = action.payload;
    });
  },
});

//export actions
export const {
  checkIfPhantomFound,
  setMetaplexCancyMachineStats,
  setMintedItems,
} = NFTSlice.actions;

//export reducers
export default NFTSlice.reducer;
