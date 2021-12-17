import React from "react";

import type { FC } from "react";
import { Connect, ApproveRedemption, Redeem } from "./components";

import "./App.css";

const App: FC = () => {
  return (
    <main>
      <Connect />
      <hr />
      <ApproveRedemption />
      <hr />
      <Redeem />
      <hr />

      <section>
        <h1>List</h1>
        <p>TODO: this should show the current grid, with non-minted items still greyed out</p>
      </section>
    </main>
  );
};

export default App;
