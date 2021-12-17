import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useNFT } from "../lib/NFTContext";

import { BigNumber } from "ethers";

interface Params {
  x?: string;
  y?: string;
  address?: string;
}

export const ApproveRedemption: FC = () => {
  const { isOperator, contract, signer, chainId } = useNFT();

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState<Params>({});
  const [sig, setSig] = useState("");

  useEffect(() => {
    (async function () {
      if (!contract || !signer) return;
      if (!data.x || !data.y || !data.address) return;

      const id = await contract.coordsToId(BigNumber.from(data.x), BigNumber.from(data.y));

      const sig = await signer._signTypedData(
        // Domain
        {
          name: await contract.name(),
          version: "1.0.0",
          chainId,
          verifyingContract: contract.address,
        },
        // Types
        {
          Mint: [
            { name: "account", type: "address" },
            { name: "tokenId", type: "uint256" },
          ],
        },
        // Value
        { account: data.address, tokenId: id }
      );

      setSig(sig);
    })();
  }, [data, contract, signer]);

  if (!contract) {
    return <div>Not Connected</div>;
  }

  if (!isOperator) {
    return <>Not an operator</>;
  }

  return (
    <>
      <h1>Pre-approve Redemption</h1>

      <form onSubmit={handleSubmit((data) => setData(data))}>
        <div>
          <label htmlFor="x">X</label>
          <input {...register("x", { required: true })} />
        </div>

        <div>
          <label htmlFor="y">Y</label>
          <input {...register("y", { required: true })} />
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input {...register("address", { required: true })} />
        </div>

        <input type="submit" />
      </form>

      <div>Signature: {sig}</div>
    </>
  );
};
