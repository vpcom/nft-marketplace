import { createAction, props } from '@ngrx/store';
import { WalletModel } from '../../core/models/wallet.model';

export const loadWallet = createAction('[Wallet] Load Wallet');
export const loadWalletSuccess = createAction('[Wallet] Load Wallet Success', props<{ wallet: WalletModel }>());
export const loadWalletFailure = createAction('[Wallet] Load Wallet Failure', props<{ error: any }>());