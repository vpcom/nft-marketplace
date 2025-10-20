import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Nft } from '../models/nft.model';

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  constructor(private apollo: Apollo) {}
  getNfts(): Observable<Nft[]> {
    console.log('getNfts called');
    if (!this.apollo) {
      console.error('Apollo client is undefined!');
      return of([] as Nft[]);
    }

    return this.apollo
      .watchQuery<{ nfts: (Partial<Nft> | undefined)[] }>({
        query: gql`
          query {
            nfts {
              id
              title
              image
              owner
              price
            }
          }
        `,
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(
        map((res) =>
          (res.data?.nfts ?? [])
            // filter out undefined values
            .filter((nft): nft is Nft => nft !== undefined && nft !== null)
            // cast each partial safely to Nft (since your backend returns full NFTs)
            .map((nft) => nft as Nft)
        )
      );
  }

  buyNft(id: string, buyer: string): Observable<Nft> {
    return this.apollo
      .mutate<{ buyNft: Nft }>({
        mutation: gql`
          mutation ($id: ID!, $buyer: String!) {
            buyNft(id: $id, buyer: $buyer) {
              id
              owner
              price
            }
          }
        `,
        variables: { id, buyer },
      })
      .pipe(map((res) => res.data?.buyNft as Nft));
  }
}
