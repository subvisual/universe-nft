import React from "react";

import type { FC } from "react";
import { Connect, ApproveRedemption } from "./components";

import "./App.css";

const App: FC = () => {
  return (
    <main>
      <Connect />

      <hr />

      <ApproveRedemption />

      <hr />

      <section>
        <h1>Redeem</h1>
        <p>TODO: this should be a minting form</p>
      </section>

      <hr />

      <section>
        <h1>List</h1>
        <p>TODO: this should show the current grid, with non-minted items still greyed out</p>
      </section>
    </main>
  );
};

export default App;
