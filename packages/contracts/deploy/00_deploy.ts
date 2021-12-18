import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("SubvisualUniverseNFT", {
    from: deployer,
    args: ["Subvisual Universe NFT", "SV-UNI", "https://nft.subvisual.com/", 255, 255],
    log: true,
  });
};

func.id = "deploy_nft";
func.tags = ["SubvisualUniverseNFT"];

export default func;
