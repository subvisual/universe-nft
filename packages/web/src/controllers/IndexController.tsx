import type { FC } from "react";

import { useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { Web3Provider } from "@ethersproject/providers";

import IndexView from "../views/IndexView";

import { useMint } from "../lib/MintContext";

const injected = new InjectedConnector({
  supportedChainIds: [1, 4, 31337],
});
const network = new NetworkConnector({
  urls: {
    1: process.env.REACT_APP_MAINNET_ALCHEMY_ENDPOINT!,
    4: process.env.REACT_APP_RINKEBY_ALCHEMY_ENDPOINT!,
    31337: "http://127.0.0.1:8545",
  },
  defaultChainId: process.env.NODE_ENV === "production" ? 4 : 31337,
});

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

      {/* mint view. due to limitations on appfairy, we can't isolate this in its own component.
      each element needs to be a direct children of IndexController */}
      {/* actually, I'm lying. this could all be solved by adding a `af-el=af-mint` attribute in a webflow section around all these elements */}
      {mint.mintable && <af-mint-btn onClick={mint.onMintClick} />}
      {mint.minted && <af-mint-success />}
      {mint.minted && <af-refresh-btn />}
    </IndexView>
  );
};

export default IndexController;
