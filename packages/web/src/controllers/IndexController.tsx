import type { FC } from "react";

import { useEffect, useCallback, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { Web3Provider } from "@ethersproject/providers";

import { List } from "../components";
import IndexView from "../views/IndexView";

import { useMint } from "../lib/MintContext";

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

interface Mint {
  status?: string;
  x?: string;
  y?: string;
  sig?: string;
}

const IndexController: FC = () => {
  const { activate, account } = useWeb3React<Web3Provider>();
  const mint = useMint();

  const onConnectBtn = useCallback(
    (e: any) => {
      e.preventDefault();
      activate(injected);
    },
    [injected, activate]
  );

  // connect to network provider
  useEffect(() => {
    activate(network);
  }, []);

  return (
    <IndexView>
      {account ? (
        <af-metamask-connect-success />
      ) : (
        <af-metamask-connect-btn onClick={onConnectBtn}>
          {account ? `Connected with ${account}` : "Connect To Metamask"}
        </af-metamask-connect-btn>
      )}

      {/* mint view. due to limitations on appfairy, we can't isolate this in its own component */}
      {mint.mintable && <af-mint-btn onClick={mint.onMintClick} />}
      {mint.minted && <af-mint-success />}
      {mint.minted && <af-refresh-btn />}

      {/* @ts-ignore */}
      <grid>
        <List />
        {/* @ts-ignore */}
      </grid>
    </IndexView>
  );
};

export default IndexController;
