import { FC } from "react";

import { Connect, Redeem, Yours, List } from "../components";
import IndexView from "../views/IndexView";

const IndexController: FC = () => {
  return (
    <IndexView>
      <wallet-connect-btn>
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
