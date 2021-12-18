import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { BigNumber } from "ethers";
import { ethers } from "ethers";

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

  const onSubmit = useCallback(
    (data: Params) => {
      (async function () {
        if (!contract || !signer || !data.sig) return;

        try {
          const id = await contract.coordsToId(BigNumber.from(data.x), BigNumber.from(data.y));

          await contract.connect(signer).redeem(id, data.sig, { gasLimit: 5000000 });
        } catch (err) {
          console.log(err);
        }
      })();
    },
    [contract, signer]
  );

  if (!signer) {
    return <div>Not connected</div>;
  }

  return (
    <>
      <h2>Mint</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="x">X</label>
          <input {...register("x", { required: true })} />
        </div>
        <div>
          <label htmlFor="y">Y</label>
          <input {...register("y", { required: true })} />
        </div>
        <div>
          <label htmlFor="sig">Signature</label>
          <input {...register("sig", { required: true })} />
        </div>

        <input type="submit" value="Mint" />
      </form>
    </>
  );
};
