import { provideApollo } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

export function provideApolloClient(httpLink: HttpLink) {
  return provideApollo(() => ({
    link: httpLink.create({ uri: 'http://localhost:4000/graphql' }),
    cache: new InMemoryCache(),
  }));
}