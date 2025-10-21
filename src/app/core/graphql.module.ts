import { NgModule } from '@angular/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { HttpClientModule } from '@angular/common/http';

const uri = 'http://localhost:4000/graphql';

export function createApollo(httpLink: HttpLink) {
  console.log('[GQL] createApollo called');
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            nfts: {
              // always prefer server incoming list for simplicity
              merge(existing, incoming) {
                console.log('Merging');
                console.log('Existing:', existing);
                console.log('Incoming:', incoming);
                return incoming;
              },
            },
          },
        },
        Nft: {
          keyFields: ['id'],
        },
      },
    }),
  };
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}