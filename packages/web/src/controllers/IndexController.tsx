import { FC } from "react";

import { Connect, Redeem, Yours, List } from "../components";
import IndexView from "../views/IndexView";

const IndexController: FC = () => {
  return (
    <IndexView>
      <p>asd</p>
      {/* @ts-ignore */}
      <wallet-connect-btn onClick={() => console.log("connecting")} />
      {/* @ts-ignore */}
      <afroot>
        <Connect />
        <hr />
        <Redeem />
        <hr />
        <List />
        {/* @ts-ignore */}
      </afroot>
    </IndexView>
  );
};

export default IndexController;
