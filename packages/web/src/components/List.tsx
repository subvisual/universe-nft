import { FC, useState, useEffect } from "react";

import { useNFT } from "../lib/NFTContext";

interface TokenAndOwner {
  uri: string;
  owner: string;
}

export const List: FC = () => {
  const { contract } = useNFT();
  const [supply, setSupply] = useState(0);
  const [tokensAndOwners, setTokensAndOwners] = useState<TokenAndOwner[]>([]);

  useEffect(() => {
    (async function () {
      if (!contract) return;

      const supply = await contract.totalSupply();

      const promises = Array(supply.toNumber())
        .fill(0)
        .map(async (_, i) => {
          const id = await contract.tokenByIndex(i);
          return { uri: await contract.tokenURI(id), owner: await contract.ownerOf(id) };
        });

      setSupply(supply.toString());
      setTokensAndOwners(await Promise.all(promises));
    })();
  }, [contract]);

  return (
    <div>
      <h2>List</h2>
      <span>Supply: {supply}</span>
      <ul>
        {tokensAndOwners.map(({ uri, owner }) => (
          <li key={uri}>
            {uri} (owned by {owner})
          </li>
        ))}
      </ul>
    </div>
  );
};
