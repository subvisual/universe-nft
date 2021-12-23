import { ethers, network } from "hardhat";
import { SubvisualUniverseNFT } from "../typechain-types";
import { BigNumber } from "ethers";

interface Recipient {
  address: string;
  x: number;
  y: number;
}

interface Config {
  nft: string;
  recipients: Recipient[];
}

const configs: Record<string, Config> = {
  localhost: {
    nft: "0x9ce37148F5E347E55857C22c012B0741e4733130",
    recipients: [
      { address: "0x6D41E0096f332Af1Fab2ba21936ce120dE9244f2", x: 100, y: 103 },
    ],
  },
  mainnet: {
    nft: "TODO",
    recipients: [],
  },
};

async function main() {
  const SubvisualUniverseNFT = await ethers.getContractFactory(
    "SubvisualUniverseNFT"
  );

  const config = configs[network.name];
  const nft = SubvisualUniverseNFT.attach(config.nft);
  const [signer] = await ethers.getSigners();

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

  const promises = config.recipients.map(async ({ address, x, y }) => {
    const id = await nft.coordsToId(BigNumber.from(x), BigNumber.from(y));
    const value = { account: address, tokenId: id };

    const sig = await signer._signTypedData(domain, types, value);
    console.log(`${x}-${y}-${sig}`);
  });

  await Promise.all(promises);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
