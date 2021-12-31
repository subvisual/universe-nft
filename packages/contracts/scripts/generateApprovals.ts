import { ethers, network } from "hardhat";
import { SubvisualUniverseNFT } from "../typechain-types";
import { BigNumber } from "ethers";

import csv from "async-csv";
import { promises as fs } from "fs";

const fixture = (name: string, address: string, x: number, y: number) => [
  name,
  "",
  "",
  "",
  address,
  "",
  "",
  x,
  y,
];

const fixtures = [
  fixture("Alice", "0x6D41E0096f332Af1Fab2ba21936ce120dE9244f2", 103, 121),
  fixture("Bob", "0x0606Af40D316662aC2e7194E88806057F834D60b", 108, 118),
  fixture("Carol", "0xB641C6eF483C56aD6C2B44A9242C776d599D421c", 108, 117),
];

async function main() {
  const [signer] = await ethers.getSigners();

  const nft = (await ethers.getContractAt(
    "SubvisualUniverseNFT",
    "0x9EF8Fdf28805B4A32381D037b6579B5A752dA386",
    signer
  )) as SubvisualUniverseNFT;

  const domain = {
    name: await nft.name(),
    version: "1.0.0",
    chainId: (await ethers.provider.getNetwork()).chainId,
    verifyingContract: nft.address,
  };
  const types = {
    Mint: [
      { name: "account", type: "address" },
      { name: "tokenId", type: "uint256" },
    ],
  };

  let rows: any[] = [];

  switch (network.name) {
    case "hardhat":
      rows = fixtures;
      break;
    case "localhost":
      rows = fixtures;
      break;
    case "mainnet":
      const csvString = await fs.readFile(
        `${__dirname}/../../../people.csv`,
        "utf-8"
      );
      rows = (await csv.parse(csvString)).splice(1);
      break;
  }

  const promises = rows.map(async (row: any) => {
    const [name, , , , originalAddress, ens, , y, x] = row;
    const address =
      ens.length > 0 && network.name == "mainnet"
        ? await ethers.provider.resolveName(ens)
        : originalAddress;

    let redeemCode;
    if (address) {
      const id = await nft.coordsToId(x, y);
      const value = { account: address, tokenId: id };
      const sig = await signer._signTypedData(domain, types, value);
      redeemCode = `${x}-${y}-${sig}`;
    }

    console.log(`${name}, ${address}, ${redeemCode}`);
  });

  await Promise.all(promises);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
