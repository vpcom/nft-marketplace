export interface NftAttribute {
  trait_type: string;
  value: string;
}

export interface Nft {
  id: string;
  title: string;
  name: string;
  description: string;
  image: string;
  owner: string;
  price: number;
  attributes?: NftAttribute[];
}