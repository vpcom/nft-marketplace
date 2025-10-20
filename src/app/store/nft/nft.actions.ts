import { createAction, props } from '@ngrx/store';
import { Nft } from '../../core/models/nft.model';

export const loadNfts = createAction('[NFT] Load NFTs');
export const loadNftsSuccess = createAction('[NFT] Load NFTs Success', props<{ nfts: Nft[] }>());
export const loadNftsFailure = createAction('[NFT] Load NFTs Failure', props<{ error: any }>());

export const buyNft = createAction('[NFT] Buy NFT', props<{ id: string; buyer: string }>());
export const buyNftSuccess = createAction('[NFT] Buy NFT Success', props<{ nft: Nft }>());
export const buyNftFailure = createAction('[NFT] Buy NFT Failure', props<{ error: any }>());

export const updateNftFromSocket = createAction('[NFT] Update From Socket', props<{ nft: Nft }>());