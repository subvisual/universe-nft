import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { BigNumber } from "ethers";

import { useNFT } from "../lib/NFTContext";

interface Params {
  x?: string;
  y?: string;
  address?: string;
  sig?: string;
}

export const Redeem: FC = () => {
  const { contract, signer } = useNFT();
  const { register, handleSubmit } = useForm();

  const redeemCode = new URLSearchParams(window.location.search).get(
    "redeemCode"
  );

  const params = redeemCode ? redeemCode.split("-") : [];

  const x = params[0];
  const y = params[1];
  const sig = params[2];

  const onSubmit = useCallback(
    (data: Params) => {
      (async function () {
        if (!contract || !signer || !data.sig) return;

        try {
          const id = await contract.coordsToId(
            BigNumber.from(data.x),
            BigNumber.from(data.y)
          );

          await contract
            .connect(signer)
            .redeem(id, data.sig, { gasLimit: 5000000 });
        } catch (err) {
          console.log(err);
        }
      })();
    },
    [contract, signer]
  );

  const onMint = useCallback(() => {
    (async function () {
      if (!contract || !signer) return;

      try {
        const id = await contract.coordsToId(x, y);
        await contract.connect(signer).redeem(id, sig, { gasLimit: 5000000 });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [contract, signer]);

  if (!redeemCode || redeemCode.length == 0) {
    return <></>;
  }

  if (!signer) {
    return <div>Connect your wallet to redeem your NFT!</div>;
  }

  return (
    <>
      <h2>Mint</h2>
      <button onClick={onMint}>Redeem!</button>
    </>
  );
};
