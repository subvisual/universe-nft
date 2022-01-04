import type { FC } from "react";

import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { useNFT } from "../lib/NFTContext";

interface Props {
  x: number;
  y: number;
  size: number;
}

const emptyURI = (x: number, y: number) => `/empty/${x}x${y}.png`;

const coordsToId = (x: number, y: number) => (x << 16) + y;

export const Cell: FC<Props> = ({ x, y, size }) => {
  const id = coordsToId(x, y);
  const [uri, setUri] = useState(emptyURI(x, y));

  const { contract } = useNFT();

  useEffect(() => {
    (async function () {
      if (!contract) return;

      const data = await contract.tokenData(id);

      if (data.owner != ethers.constants.AddressZero) {
        setUri(data.uri);
      }
    })();
  }, [contract]);

  return <img style={{ width: size, height: size }} src={uri} />;
};
