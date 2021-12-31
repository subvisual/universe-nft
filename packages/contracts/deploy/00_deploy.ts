import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const uri = hre.network.live
    ? "https://holidays.subvisual.com/minted/"
    : "http://localhost:3000/minted/";

  await deploy("SubvisualUniverseNFT", {
    from: deployer,
    args: ["Subvisual Universe NFT", "SV-UNI", uri, ".png", 255, 255, deployer],
    log: true,
    deterministicDeployment: true,
  });
};

func.id = "deploy_nft";
func.tags = ["SubvisualUniverseNFT"];

export default func;
