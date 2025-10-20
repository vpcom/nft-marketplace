import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as NftActions from './nft.actions';
import { GraphQLService } from '../../core/services/graphql.service';
import { of, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';

@Injectable()
export class NftEffects {

  loadNfts$;

  constructor(private actions$: Actions, private graphql: GraphQLService) {
    console.log('constructor now runs before effect uses graphql');

    this.loadNfts$ = createEffect(() =>
      this.actions$.pipe(
        ofType(NftActions.loadNfts),
        mergeMap(() =>
          this.graphql.getNfts().pipe(
            map((nfts) => NftActions.loadNftsSuccess({ nfts })),
            catchError((error) => of(NftActions.loadNftsFailure({ error })))
          )
        )
      )
    );
  }

  // constructor(private actions$: Actions, private graphql: GraphQLService) {
  //   console.log('Actions injected:', actions$);
  //   console.log('GraphQLService injected:', graphql);
  // }
  // loadNfts$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(NftActions.loadNfts),
  //     mergeMap(() =>
  //       this.graphql.getNfts().pipe(
  //         map((nfts) => NftActions.loadNftsSuccess({ nfts })),
  //         catchError((error) => of(NftActions.loadNftsFailure({ error })))
  //       )
  //     )
  //   )
  // );

  // loadNfts$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(NftActions.loadNfts),
  //     mergeMap(() => {
  //       // Use real service if available, otherwise fall back to empty array
  //       const source$: Observable<any> = (this.graphql && typeof this.graphql.getNfts === 'function')
  //         ? this.graphql.getNfts() || of([] as any[])
  //         : of([] as any[]);

  //       return source$.pipe(
  //         map((nfts: any) => NftActions.loadNftsSuccess({ nfts: nfts ?? [] })),
  //         catchError((error) => of(NftActions.loadNftsFailure({ error })))
  //       );
  //     })
  //   )
  // );

  // buyNft$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(NftActions.buyNft),
  //     mergeMap(({ id, buyer }) => {
  //       const source$: Observable<any> = (this.graphql && typeof this.graphql.buyNft === 'function')
  //         ? this.graphql.buyNft(id, buyer) || of(null)
  //         : of(null);

  //       return source$.pipe(
  //         map((result: any) => {
  //           if (result) {
  //             return NftActions.buyNftSuccess({ nft: result });
  //           }
  //           return NftActions.buyNftFailure({ error: 'buyNft not implemented or returned no data' });
  //         }),
  //         catchError((error) => of(NftActions.buyNftFailure({ error })))
  //       );
  //     })
  //   )
  // );
}
