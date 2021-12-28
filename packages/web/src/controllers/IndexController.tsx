import type { FC } from "react";
import { useEffect } from "react";

import { Connect, Redeem, Yours, List } from "../components";
import IndexView from "../views/IndexView";

import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { Web3Provider } from "@ethersproject/providers";

const injected = new InjectedConnector({
  supportedChainIds: [1, 31337],
});
const network = new NetworkConnector({
  urls: {
    // TODO 1
    31337: "http://127.0.0.1:8545",
  },
  defaultChainId: 31337,
});

const IndexController: FC = () => {
  const { connector, activate, account } = useWeb3React<Web3Provider>();

  useEffect(() => {
    activate(network);
  }, []);

  useEffect(() => {
    if (!account) return;

    console.log(`connected to ${account}`);
  }, [account]);

  return (
    <IndexView>
      {/* @ts-ignore */}
      <wallet-connect-btn onClick={() => activate(injected)}>
        {account ? `Connected with ${account}` : "Connect To Metamask"}
        {/* @ts-ignore */}
      </wallet-connect-btn>
      {/* @ts-ignore */}
      <grid>
        <p>asd</p>
        <Connect />
        <hr />
        <Redeem />
        <hr />
        <List />
        {/* @ts-ignore */}
      </grid>
    </IndexView>
  );
};

export default IndexController;
