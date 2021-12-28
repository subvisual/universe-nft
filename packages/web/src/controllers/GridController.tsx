import type { FC } from "react";

import { Connect, Redeem, Yours, List } from "../components";

const GridController: FC = () => {
  return (
    <div>
      <Redeem />
      <hr />
      <List />
    </div>
  );
};

export default GridController;
