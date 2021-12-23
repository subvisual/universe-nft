import { useState, useEffect } from "react";
import type { FC } from "react";

import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { Web3Provider } from "@ethersproject/providers";

import { Spinner } from "./Spinner";

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

export const Connect: FC = () => {
  const { connector, activate } = useWeb3React<Web3Provider>();
  const [activating, setActivating] = useState<any>();
  const [connected, setConnected] = useState(!!connector);

  useEffect(() => {
    setConnected(!!connector);
  }, [connector]);

  useEffect(() => {
    activate(network);
  }, []);

  return (
    <div>
      <button
        style={{
          height: "3rem",
          borderRadius: "1rem",
          borderColor: activating ? "orange" : connected ? "green" : "unset",
          position: "relative",
        }}
        key="injected"
        onClick={() => {
          setActivating(injected);
          activate(injected);
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            height: "100%",
            display: "flex",
            alignItems: "center",
            color: "black",
            margin: "0 0 0 1rem",
          }}
        >
          {activating && (
            <Spinner
              color={"black"}
              style={{ height: "25%", marginLeft: "-1rem" }}
            />
          )}
          {!!connector && (
            <span role="img" aria-label="check">
              ✅
            </span>
          )}
        </div>
        Connect w/ Injected connector
      </button>
    </div>
  );
};

Connect.propTypes = {};

Connect.defaultProps = {};
