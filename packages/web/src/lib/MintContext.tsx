import type { FC } from "react";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { BigNumber } from "ethers";

import { useNFT } from "./NFTContext";

interface MintParams {
  x?: string;
  y?: string;
  sig?: string;
}

interface MintContext {
  params: MintParams;
  mintable: boolean;
  minted: boolean;
  onMintClick: () => void;
}

const MintContext = createContext<MintContext>({
  params: {},
  mintable: false,
  minted: false,
  onMintClick: () => {
    /* do nothing */
  },
});

export const MintProvider: FC = ({ children }) => {
  const { contract, signer } = useNFT();
  const [params, setParams] = useState<MintParams>({});
  const [mintable, setMintable] = useState(false);
  const [minted, setMinted] = useState(false);

  // decode redeemCode url param
  useEffect(() => {
    const redeemCode = new URLSearchParams(window.location.search).get(
      "redeemCode"
    );

    if (!signer || !redeemCode) return;

    const params = redeemCode.split("-");
    const x = params[0];
    const y = params[1];
    const sig = params[2];

    setParams({ x, y, sig });
    setMintable(true);
  }, [signer]);

  const onMintClick = useCallback(() => {
    (async function () {
      if (!mintable || !contract || !signer || !params.sig) return;

      try {
        const id = await contract.coordsToId(
          BigNumber.from(params.x),
          BigNumber.from(params.y)
        );

        await contract
          .connect(signer)
          .redeem(id, params.sig, { gasLimit: 5000000 });

        setMintable(false);
        setMinted(true);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [mintable, minted, contract, signer]);

  return (
    <MintContext.Provider value={{ params, mintable, minted, onMintClick }}>
      {children}
    </MintContext.Provider>
  );
};

export const useMint = (): MintContext => useContext(MintContext);
