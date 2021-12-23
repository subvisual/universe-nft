import { run, ethers } from "hardhat";

async function main() {
  const NFT = await ethers.getContractFactory("MockERC20");
  const nft = NFT.attach()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
