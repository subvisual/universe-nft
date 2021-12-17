import React, { useState, useEffect } from "react";
import type { FC } from "react";

import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";

import { Spinner } from "./Spinner";
import { ConnectionStatus } from "./ConnectionStatus";

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 1337] });

export const Connect: FC = () => {
  const { connector, activate } = useWeb3React<Web3Provider>();
  const [activating, setActivating] = useState<any>();
  const [connected, setConnected] = useState(!!connector);

  useEffect(() => {
    setConnected(!!connector);
  }, [connector]);

  return (
    <div>
      <ConnectionStatus />
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
          {activating && <Spinner color={"black"} style={{ height: "25%", marginLeft: "-1rem" }} />}
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
