import { createSelector } from '@ngrx/store';
import { WalletState } from './wallet.reducer';

export const selectWalletState = (state: any) => state.wallet;

export const selectWallet = createSelector(
  selectWalletState,
  (state: WalletState) => state.wallet
);

export const selectWalletLoading = createSelector(
  selectWalletState,
  (state: WalletState) => state.loading
);

export const selectWalletError = createSelector(
  selectWalletState,
  (state: WalletState) => state.error
);