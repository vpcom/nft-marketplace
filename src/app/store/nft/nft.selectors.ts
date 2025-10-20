import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NftState } from './nft.reducer';

export const selectNftState = createFeatureSelector<NftState>('nft');

export const selectAllNfts = createSelector(selectNftState, (state) => state.list);
export const selectNftLoading = createSelector(selectNftState, (state) => state.loading);
