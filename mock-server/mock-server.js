import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typeDefs = `#graphql
  type NftAttribute {
    trait_type: String!
    value: String!
  }

  type Nft {
    id: ID!
    title: String!
    name: String!
    description: String!
    image: String!
    owner: String!
    price: Float!
    attributes: [NftAttribute!]
  }

  type Query {
    nfts: [Nft!]!
    nft(id: ID!): Nft
  }

  type Mutation {
    mintNFT(name: String!, description: String!, price: Float!, image: String!): Nft!
  }
`;

const mockNfts = [
  {
    id: '1',
    title: 'Cool Cat #1',
    name: 'Cool Cat #1',
    description: 'A cool cat NFT',
    image: './cat.webp',
    owner: '0x123...abc',
    price: 0.5,
    attributes: [
      { trait_type: 'Background', value: 'Blue' },
      { trait_type: 'Eyes', value: 'Green' },
    ],
  },
  {
    id: '2',
    title: 'Rare Dragon',
    name: 'Rare Dragon',
    description: 'A rare dragon NFT',
    image: './dragon.webp',
    owner: '0x456...def',
    price: 1.2,
    attributes: [
      { trait_type: 'Element', value: 'Fire' },
      { trait_type: 'Size', value: 'Large' },
    ],
  },
  {
    id: '3',
    title: 'Mario Pixel Art',
    name: 'Mario Pixel Art',
    description: 'Mario in pixel art',
    image: './mario.webp',
    owner: '0x789...ghi',
    price: 0.8,
    attributes: [
      { trait_type: 'Style', value: '8-bit' },
      { trait_type: 'Theme', value: 'Gaming' },
    ],
  },
];

const resolvers = {
  Query: {
    nfts: () => mockNfts,
    nft: (_, { id }) => mockNfts.find((nft) => nft.id === id),
  },
  Mutation: {
    mintNFT: (_, { name, description, price, image }) => {
      const newNft = {
        id: String(mockNfts.length + 1),
        title: name,
        name,
        description,
        image,
        owner: '0xNEW...mint',
        price,
        attributes: [],
      };
      mockNfts.push(newNft);
      return newNft;
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

async function start() {
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`Mock GraphQL server ready at ${url}`);
}
start().catch((err) => {
  console.error('[mock-server] startup error', err);
  process.exit(1);
});