import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const uri = hre.network.live
    ? "http://holidays.subvisual.com/minted/"
    : "http://localhost:3000/minted/";

  await deploy("SubvisualUniverseNFT", {
    from: deployer,
    args: ["Subvisual Universe NFT", "SV-UNI", uri, ".png", 255, 255],
    log: true,
  });
};

func.id = "deploy_nft";
func.tags = ["SubvisualUniverseNFT"];

export default func;
