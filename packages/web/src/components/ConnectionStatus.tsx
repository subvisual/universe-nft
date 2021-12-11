import { useState, useEffect } from "react";
import type { FC } from "react";

import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";

import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

export const ConnectionStatus: FC = () => {
  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React<Web3Provider>();

  const [balance, setBalance] = useState(0);
  const [blockNumber, setBlockNumber] = useState<number | undefined>(0);

  // update block number
  useEffect(() => {
    if (!!library) {
      library.getBlockNumber().then((n: number) => {
        setBlockNumber(n);
      });

      const updateBlockNumber = (blockNumber: number) => {
        setBlockNumber(blockNumber);
      };
      library.on("block", updateBlockNumber);

      return () => {
        library.removeListener("block", updateBlockNumber);
        setBlockNumber(undefined);
      };
    }
  }, [library, chainId]);

  // update balance
  useEffect(() => {
    if (!!account && !!library) {
      library.getBalance(account).then((balance: any) => setBalance(balance));
    }
  }, [account, chainId, library]);

  return (
    <div>
      <h1>{active ? "Connected" : "Not Connected"}</h1>
      {active && (
        <>
          <p>Chain id: {chainId}</p>
          <p>Block number: {blockNumber}</p>
          <p>Account: {account}</p>
          <p>Balance: Ξ{formatEther(balance)}</p>
        </>
      )}
      {(active || error) && <button onClick={() => deactivate()}>Deactivate</button>}

      {!!error && <h4>{getErrorMessage(error)}</h4>}
    </div>
  );
};
