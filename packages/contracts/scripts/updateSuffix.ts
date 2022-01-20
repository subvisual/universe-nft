import { ethers, network } from "hardhat";
import { SubvisualUniverseNFT } from "../typechain-types";

const addresses: Record<number, string> = {
  1: "0x5738379364Fab26c7e044c02deD4ceef93333D84",
  31337: "0x6d5f81DB6e14220C0D118A7958bf6d669d085524",
};

async function main() {
  const [signer] = await ethers.getSigners();
  const chainId = (await ethers.provider.getNetwork()).chainId;
  console.log(chainId);

  const nft = (await ethers.getContractAt(
    "SubvisualUniverseNFT",
    addresses[chainId] as string,
    signer
  )) as SubvisualUniverseNFT;

  await nft.setURISuffix(".json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
