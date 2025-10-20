import { createReducer, on } from '@ngrx/store';
import * as NftActions from './nft.actions';
import { Nft } from '../../core/models/nft.model'; // or NftModel

export interface NftState {
  list: Nft[];
  loading: boolean;
  error: any;
}

const initialState: NftState = {
  list: [],
  loading: false,
  error: null,
};

export const nftReducer = createReducer(
  initialState,
  on(NftActions.loadNfts, (state) => ({ ...state, loading: true })),
  on(NftActions.loadNftsSuccess, (state, { nfts }) => ({
    ...state,
    list: nfts,
    loading: false,
  })),
  on(NftActions.loadNftsFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(NftActions.buyNftSuccess, (state, { nft }) => ({
    ...state,
    list: state.list.map((item) => (item.id === nft.id ? nft : item)),
  })),

  on(NftActions.updateNftFromSocket, (state, { nft }) => ({
    ...state,
    list: state.list.map((item) => (item.id === nft.id ? nft : item)),
  }))
);