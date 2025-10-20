import { createReducer, on } from '@ngrx/store';
import { WalletModel } from '../../core/models/wallet.model';
import * as WalletActions from './wallet.actions';

export interface WalletState {
  wallet: WalletModel | null;
  loading: boolean;
  error: any;
}

export const initialState: WalletState = {
  wallet: null,
  loading: false,
  error: null
};

export const walletReducer = createReducer(
  initialState,
  on(WalletActions.loadWallet, state => ({ ...state, loading: true })),
  on(WalletActions.loadWalletSuccess, (state, { wallet }) => ({ ...state, wallet, loading: false })),
  on(WalletActions.loadWalletFailure, (state, { error }) => ({ ...state, error, loading: false }))
);