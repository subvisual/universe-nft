import React from "react";

import type { FC } from "react";
import { Connect, Redeem, Yours, List } from "./components";

import "./App.css";

const App: FC = () => {
  return (
    <main>
      <Connect />
      <hr />
      <Redeem />
      <hr />
      <Yours />
      <hr />
      <List />
    </main>
  );
};

export default App;
