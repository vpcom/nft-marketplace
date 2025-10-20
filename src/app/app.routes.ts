import { Routes } from '@angular/router';
import { NftListComponent } from './components/nft-list/nft-list.component';
import { NftDetailComponent } from './components/nft-detail/nft-detail.component';
import { NftMintComponent } from './components/nft-mint/nft-mint.component';

export const appRoutes: Routes = [
  { path: '', component: NftListComponent },
  { path: 'nft/:id', component: NftDetailComponent },
  { path: 'mint', component: NftMintComponent },
  { path: '**', redirectTo: '' },
];