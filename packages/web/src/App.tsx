import type { FC } from "react";

import IndexView from "./views/IndexView";

import { NFTProvider } from "./lib/NFTContext";
import { MintProvider } from "./lib/MintContext";

import "./App.css";

const App: FC = () => {
  return (
    <NFTProvider>
      <MintProvider>
        <IndexView />
      </MintProvider>
    </NFTProvider>
  );
};

export default App;
