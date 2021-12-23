import type { BigNumber } from "ethers";

import { FC, useState, useEffect } from "react";

import { useNFT } from "../lib/NFTContext";

import { Cell } from "./Cell";

interface Data {
  id: BigNumber;
  uri: string;
}

export const Yours: FC = () => {
  const { contract, signer } = useNFT();
  const [balance, setBalance] = useState(0);
  const [datas, setDatas] = useState<Data[]>([]);

  useEffect(() => {
    (async function () {
      if (!contract || !signer) return;

      const address = await signer.getAddress();
      const balance = await contract.balanceOf(address);

      const promises = Array(balance.toNumber())
        .fill(0)
        .map(async (_, i) => {
          const id = await contract.tokenOfOwnerByIndex(address, i);
          return contract.tokenData(id);
        });

      setBalance(balance.toString());
      setDatas(await Promise.all(promises));
    })();
  }, [contract, signer]);

  return (
    <div>
      <h2>Yours</h2>
      <ul style={{ listStyleType: "none" }}>
        {datas.map(({ uri, id }: any) => (
          <li key={uri}>
            <Cell size={50} uri={uri} />
          </li>
        ))}
      </ul>
    </div>
  );
};
