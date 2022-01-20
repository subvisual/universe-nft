import type { FC } from "react";

import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
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
  const { library, account } = useWeb3React<Web3Provider>();
  const id = coordsToId(x, y);
  const [uri, setUri] = useState(emptyURI(x, y));
  const [label, setLabel] = useState("");
  const [owner, setOwner] = useState<string | null>(null);
  const [ens, setEns] = useState<string | null>(null);
  const [own, setOwn] = useState<boolean>(false);
  const [data, setData] = useState<Record<any, any>>({});

  const { contract } = useNFT();

  // update owner and URI
  useEffect(() => {
    (async function () {
      if (!contract) return;

      const data = await contract.tokenData(id);

      setData(data);
    })();
  }, [contract]);

  useEffect(() => {
    if (data.owner != ethers.constants.AddressZero) {
      setOwner(data.owner);
    }
  }, [data.owner]);

  useEffect(() => {
    if (!data.uri) return;

    if (data.uri.match(/\.json$/)) {
      axios(data.uri).then(({ data }) => {
        if (!data.images) return;

        setUri(data.images["200x200"]);
      });
    } else {
      setUri(data.uri);
    }
  }, [data.uri]);

  // update label
  useEffect(() => {
    (async function () {
      if (!owner) {
        return;
      }

      let label = owner;

      try {
        const ens = await library!.lookupAddress(owner);

        if (ens) {
          label = ens;
        }
      } catch (err) {
        console.log(err);
      }

      setLabel(label);
    });
  }, [owner]);

  // update own
  useEffect(() => {
    if (!owner || !account) {
      return;
    }

    setOwn(owner == account);
  }, [owner, account]);

  return (
    <img
      style={{
        width: size,
        height: size,
        boxShadow: own ? "0px 2px 10px 0px rgba(0,0,0,0.5)" : "none",
      }}
      src={uri}
      alt={label}
      title={label}
    />
  );
};
