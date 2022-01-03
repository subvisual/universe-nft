import { DeployFunction } from "hardhat-deploy/types";

interface Config {
  uri: string;
}

const config: Record<string, Config> = {
  mainnet: {
    uri: "https://holidays.subvisual.com/minted/",
  },
  rinkeby: {
    uri: "https://holidays-rinkeby.subvisual.com/minted/",
  },
  default: {
    uri: "http://localhost:3000/minted/",
  },
};

const func: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const { uri } = config[hre.network.name] || config.default;

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
