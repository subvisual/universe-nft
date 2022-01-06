import { task } from "hardhat/config";

import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import "hardhat-gas-reporter";

import type { HardhatUserConfig } from "hardhat/config";

task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const devMnemonic =
  "core tornado motion pigeon kiss dish differ asthma much ritual black foil";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 20,
      },
    },
  },
  namedAccounts: {
    deployer: 0,
    alice: 1,
    bob: 2,
    carol: 3,
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: devMnemonic,
      },
    },
    mainnet: {
      url: process.env.MAINNET_ALCHEMY_ENDPOINT,
      accounts: {
        mnemonic: process.env.MAINNET_MNEMONIC,
      },
    },
    rinkeby: {
      url: process.env.RINKEY_ALCHEMY_ENDPOINT,
      accounts: {
        mnemonic: devMnemonic,
      },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    gasPrice: 100,
    currency: "EUR",
  },
};

export default config;
