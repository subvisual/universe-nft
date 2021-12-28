import { FC, useState, useEffect } from "react";

import { useNFT } from "../lib/NFTContext";

import { Cell } from "./Cell";

interface TokenAndOwner {
  uri: string;
  owner: string;
}

const coordsToId = (x: number, y: number) => (x << 16) + y;

const baseEmptyURI =
  process.env.NODE_ENV == "production"
    ? "https://holidays.subvisual.com/empty/"
    : "http://localhost:3000/empty/";

const emptyURI = (x: number, y: number) => `${baseEmptyURI}/${x}x${y}.png`;

export const List: FC = () => {
  const { contract } = useNFT();
  const [supply, setSupply] = useState(0);
  const [tokensAndOwners, setTokensAndOwners] = useState<
    Record<string, TokenAndOwner>
  >({});
  const W = 21;
  const H = 21;
  const startX = 101;
  const startY = 101;
  const cellSize = 70;
  const [rows] = useState(Array(W).fill(0));
  const [cols] = useState(Array(H).fill(0));

  // collect list of all minted NFTs
  useEffect(() => {
    (async function () {
      if (!contract) return;

      const supply = await contract.totalSupply();

      const tokens: Record<string, TokenAndOwner> = {};
      const promises = Array(supply.toNumber())
        .fill(0)
        .map(async (_, i) => {
          const id = (await contract.tokenByIndex(i)).toNumber();
          tokens[id] = {
            uri: await contract.tokenURI(id),
            owner: await contract.ownerOf(id),
          };
        });

      await Promise.all(promises);

      setSupply(supply.toString());
      setTokensAndOwners(tokens);
    })();
  }, [contract]);

  return (
    <div>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${W}, ${cellSize}px)`,
          listStyleType: "none",
          padding: 0,
          rowGap: 1,
          margin: "auto",
        }}
      >
        {rows.map((_, idxX: number) =>
          cols.map((_, idxY: number) => {
            const x = idxX + startX;
            const y = idxY + startY;
            const id = coordsToId(x, y);
            const token = tokensAndOwners[id];
            return (
              <li
                key={id}
                style={{ padding: 1, height: cellSize, width: cellSize }}
              >
                <Cell
                  uri={(token && token.uri) || emptyURI(x, y)}
                  size={cellSize}
                />
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};
