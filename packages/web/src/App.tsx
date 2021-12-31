import type { FC } from "react";

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
