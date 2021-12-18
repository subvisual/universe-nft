import { FC, useState, useEffect } from "react";

import { useNFT } from "../lib/NFTContext";

export const Yours: FC = () => {
  const { contract, signer } = useNFT();
  const [balance, setBalance] = useState(0);
  const [uris, setURIs] = useState<string[]>([]);

  useEffect(() => {
    (async function () {
      if (!contract || !signer) return;

      const address = await signer.getAddress();
      const balance = await contract.balanceOf(address);

      const promises = Array(balance.toNumber())
        .fill(0)
        .map(async (_, i) => {
          const id = await contract.tokenOfOwnerByIndex(address, i);
          return contract.tokenURI(id);
        });

      setBalance(balance.toString());
      setURIs(await Promise.all(promises));
    })();
  }, [contract, signer]);

  return (
    <div>
      <h2>Yours</h2>
      <span>Count: {balance}</span>
      <ul>
        {uris.map((uri) => (
          <li key={uri}>{uri}</li>
        ))}
      </ul>
    </div>
  );
};
