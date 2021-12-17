import React from "react";
import ReactDOM from "react-dom";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider, ExternalProvider } from "@ethersproject/providers";

import { NFTProvider } from "./lib/NFTContext";

import App from "./App";
import "./index.css";

function getLibrary(provider: ExternalProvider): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <NFTProvider>
        <App />
      </NFTProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
