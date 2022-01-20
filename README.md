# Subvisual Universe NFT

[website]: https://holidays.subvisual.com
[hardhat]: https://hardhat.org
[etherscan]: https://etherscan.io/address/0x5738379364Fab26c7e044c02deD4ceef93333D84
[cra]: https://create-react-app.dev/
[webflow]: https://webflow.com
[appfairy]: https://github.com/DAB0mB/Appfairy
[@web3-react]: https://github.com/NoahZinsmeister/web3-react
[ethersjs]: https://docs.ethers.io/
[subvisual]: https://subvisual.com

Monorepo for Subvisual's [Universe NFT][website]

## Development

1. Clone the project and install dependencies

```
git clone git@github.com/subvisual/universe-nft
cd universe-nft
yarn install
```

2. `yarn contracts:dev` boots the local development chain (`hardhat node`), with a test contract
3. `yarn web:dev` runs the development CRA server

## Contracts

A [hardhat][hardhat] project containing the ERC721 contract

Mainnet contract is deployed to
[0x5738379364Fab26c7e044c02deD4ceef93333D84][etherscan].

Notable features:
* EIP712 signatures allow the contract owner to sign-off mints, allowing each
  individual coordinate to be minted only by the target owner;
* Contract owner can also redeem tokens on behalf of final token owners;
* Coordinates of the UI grid are encoded into the token ID, as two `uint16`
  numbers (x and y) concatenated;
* URI is updateable by the owner, but should point to the metadata file for each
  token.

### Web

A [create-react-app][cra] project.
The bulk of the project was imported from [Webflow][webflow], using the awesome
[AppFairy][appfairy] tool.
The rest is fairly simple React code with [@web3-react][web3-react] and
[ethers.js][ethersjs].

Deploys are done via Netlify. `cd packages/web && yarn run deploy:prod`.

### About

Proudly build by [Subvisual][subvisual], and released under the [MIT License](./LICENSE.md).
