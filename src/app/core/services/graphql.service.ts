import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Nft } from '../models/nft.model';

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  constructor(private apollo: Apollo) {}
  // Named queries/mutations for consistent reuse
  private GET_NFTS = gql`
    query GetNfts {
      nfts {
        id
        title
        name
        description
        image
        owner
        price
        attributes {
          trait_type
          value
        }
      }
    }
  `;

  private GET_NFT = gql`
    query GetNft($id: ID!) {
      nft(id: $id) {
        id
        title
        name
        description
        image
        owner
        price
        attributes {
          trait_type
          value
        }
      }
    }
  `;

  private MINT_NFT = gql`
    mutation MintNft($name: String!, $description: String!, $price: Float!, $image: String!) {
      mintNFT(name: $name, description: $description, price: $price, image: $image) {
        id
        title
        name
        description
        image
        owner
        price
        attributes {
          trait_type
          value
        }
      }
    }
  `;

  getNfts(): Observable<Nft[]> {
    console.log('getNfts called');
    if (!this.apollo) {
      console.error('Apollo client is undefined!');
      return of([] as Nft[]);
    }

    return this.apollo
      .watchQuery<{ nfts: (Partial<Nft> | undefined)[] }>({
        query: this.GET_NFTS,
        fetchPolicy: 'cache-and-network',
      })
      .valueChanges.pipe(
        tap((raw) => console.log('[GQL] GET_NFTS raw valueChanges:', raw)),
        map(
          (res) =>
            (res.data?.nfts ?? [])
              .filter((nft): nft is Nft => nft !== undefined && nft !== null)
              .map((nft) => nft as Nft)
        ),
        tap((nfts) => console.log('[GQL] mapped Nft[]:', nfts)),
        catchError((err) => {
          console.error('[GQL] GET_NFTS error:', err);
          return of([] as Nft[]);
        })
      );
  }

  buyNft(id: string, buyer: string): Observable<Nft> {
    const BUY_NFT = gql`
      mutation BuyNft($id: ID!, $buyer: String!) {
        buyNft(id: $id, buyer: $buyer) {
          id
          owner
          price
        }
      }
    `;

    return this.apollo
      .mutate<{ buyNft: Nft }>({
        mutation: BUY_NFT,
        variables: { id, buyer },
      })
      .pipe(
        map((res) => {
          const updated = res.data?.buyNft as Nft;
          if (updated) {
            try {
              const existing = this.apollo.client.readQuery<{ nfts: Nft[] }>({ query: this.GET_NFTS });
              if (existing?.nfts) {
                const replaced = existing.nfts.map((n) =>
                  n.id === updated.id ? { ...n, owner: updated.owner, price: updated.price } : n
                );
                this.apollo.client.writeQuery({ query: this.GET_NFTS, data: { nfts: replaced } });
              }
            } catch (e) {
              // ignore if cache is empty
            }
          }
          return updated;
        })
      );
  }

  // Fetch a single NFT by id
  getNft(id: string): Observable<Nft | null> {
    return this.apollo
      .watchQuery<{ nft: Partial<Nft> | null }>({
        query: this.GET_NFT,
        variables: { id },
        fetchPolicy: 'network-only',
      })
      .valueChanges.pipe(
        map((res) => {
          const nft = res.data?.nft;
          if (!nft) return null;
          return nft as Nft;
        })
      );
  }

  // Mint a new NFT on the mock server
  mintNft(name: string, description: string, price: number, image: string): Observable<Nft> {
    return this.apollo
      .mutate<{ mintNFT: Nft }>({
        mutation: this.MINT_NFT,
        variables: { name, description, price, image },
      })
      .pipe(map((res) => res.data?.mintNFT as Nft));
  }
}
