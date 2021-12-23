import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers, network } from "hardhat";

import { SubvisualUniverseNFT__factory } from "../typechain-types";

const configs: Record<string, any> = {
  hardhat: {
    baseURI: "http://localhost:3000/minted/",
  },
  mainnet: {
    baseURI: "https://nft.subvisual.com/minted/",
  },
};

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const config = configs[network.name];

  const { address } = await deploy("SubvisualUniverseNFT", {
    from: deployer,
    args: [
      "Subvisual Universe NFT",
      "SV-UNI",
      config.baseURI,
      ".png",
      255,
      255,
    ],
    log: true,
  });

  if (network.name == "hardhat") {
    console.log("Deploying fixtures");
    const [owner, alice] = await ethers.getSigners();
    const nft = SubvisualUniverseNFT__factory.connect(address, owner);

    await nft.redeemFor(owner.address, await nft.coordsToId(0, 0));
    await nft.redeemFor(owner.address, await nft.coordsToId(0, 1));
    await nft.redeemFor(alice.address, await nft.coordsToId(1, 0));
  }
};

func.id = "deploy_nft";
func.tags = ["SubvisualUniverseNFT"];

export default func;
