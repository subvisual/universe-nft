import React from "react";

import { Connect } from "./components/Connect";

import "./App.css";

function App() {
  return (
    <main>
      <Connect />
      <section>
        <h1>Mint</h1>
        <p>TODO: this should be a minting form</p>
      </section>

      <section>
        <h1>List</h1>
        <p>TODO: this should show the current grid, with non-minted items still greyed out</p>
      </section>
    </main>
  );
}

export default App;
