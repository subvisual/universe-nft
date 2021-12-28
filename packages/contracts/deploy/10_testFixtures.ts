import { DeployFunction } from "hardhat-deploy/types";

const fixtures: { to: string; x: number; y: number }[] = [
  // { to: "deployer", x: 0, y: 0 },
  // { to: "deployer", x: 0, y: 1 },
  // { to: "alice", x: 1, y: 0 },
];

const coordsToId = (x: number, y: number) => (x << 16) + y;

const func: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { execute } = hre.deployments;

  for (let fixture of fixtures) {
    const { to, x, y } = fixture;
    const account = (await hre.getNamedAccounts())[to];

    await execute(
      "SubvisualUniverseNFT",
      { from: deployer, log: true },
      "redeemFor",
      account,
      coordsToId(x, y)
    );
  }
};

func.id = "mint_fixtures";
func.tags = ["SubvisualUniverseNFT"];
func.skip = (env) => Promise.resolve(env.network.live);

export default func;
