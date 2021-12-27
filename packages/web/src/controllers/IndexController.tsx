import { FC } from "react";

import { Connect, Redeem, Yours, List } from "../components";
import IndexView from "../views/IndexView";

export const IndexController: FC = () => {
  return <IndexView>
    {/* @ts-ignore */}
    <afroot>
    <Connect />
      <hr />
      <Redeem />
      <hr />
      <Yours />
      <hr />
      <List />
    {/* @ts-ignore */}
    </afroot>
    </IndexView>;
};
