import { FC } from "react";

import { Connect, Redeem, Yours, List } from "../components";
import IndexView from "../views/IndexView";

export const IndexController: FC = () => {
  return (
    <IndexView>
      {/* @ts-ignore */}
      <af-walletconnectbutton>
        <p>asd</p>
        {/* @ts-ignore */}
      </af-walletconnectbutton>
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
