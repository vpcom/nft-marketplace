import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';

import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { inject } from '@angular/core';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { nftReducer } from './app/store/nft/nft.reducer';
import { walletReducer } from './app/store/wallet/wallet.reducer';
import { NftEffects } from './app/store/nft/nft.effects';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(appRoutes),

    // Apollo FIRST
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({ uri: 'http://localhost:4000/graphql' }),
        cache: new InMemoryCache(),
      };
    }),

    // NgRx SECOND
    provideStore({ nft: nftReducer, wallet: walletReducer }),
    provideEffects([NftEffects]),
  ],
}).catch((err) => console.error(err));