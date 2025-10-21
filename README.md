# NftMarketplace

This project uses Angular 20, NgRx for state management and Apollo for GraphQL.
A mock Apollo GraphQL server provides the data.

<table>
  <tr>
    <td><img src="public/NFTs.png" width="400" style="border: 2px solid #ddd; border-radius: 8px;"/></td>
    <td><img src="public/Mario.png" width="400" style="border: 2px solid #ddd; border-radius: 8px;"/></td>
    <td><img src="public/Mint.png" width="400" style="border: 2px solid #ddd; border-radius: 8px;"/></td>
  </tr>
  <tr>
    <td align="center">NFT list</td>
    <td align="center">NFT details</td>
    <td align="center">Mint page</td>
  </tr>
</table>

## Mock GraphQL server

```bash
npx nodemon --watch mock-server mock-server/mock-server.js
```
-> `http://localhost:4000/graphql`

## Angular dev server

```bash
ng serve
```
->  `http://localhost:4200/`


