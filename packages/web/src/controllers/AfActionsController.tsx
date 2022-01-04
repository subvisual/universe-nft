import type { FC } from "react";

import { useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { Web3Provider } from "@ethersproject/providers";

import AfActionsView from "../views/AfActionsView";

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

const AfActionsController: FC = () => {
  const { activate, account } = useWeb3React<Web3Provider>();
  const { mintable, minted, onMintClick } = useMint();

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
    <AfActionsView>
      {account ? (
        <af-metamask-connect-success />
      ) : (
        <af-metamask-connect-btn onClick={onConnectBtn} />
      )}

      {mintable && <af-mint-btn onClick={onMintClick} />}
      {minted && <af-mint-success />}
      {minted && <af-refresh-btn />}
    </AfActionsView>
  );
};

export default AfActionsController;
