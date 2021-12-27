import React from "react";

import type { FC } from "react";
import { Connect, Redeem, Yours, List } from "./components";
import IndexController from "./controllers/IndexController";

import "./App.css";

const App: FC = () => {
  return <IndexController />;
};

export default App;
