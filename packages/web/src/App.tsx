import React from "react";

import type { FC } from "react";
import { Connect, Redeem, Yours, List } from "./components";
import IndexController from "./controllers/IndexController";

import { NFTProvider } from "./lib/NFTContext";
import { MintProvider } from "./lib/MintContext";

import "./App.css";

const App: FC = () => {
  return (
    <NFTProvider>
      <MintProvider>
        <IndexController />
      </MintProvider>
    </NFTProvider>
  );
};

export default App;
