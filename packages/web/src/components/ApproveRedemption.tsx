import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BigNumber } from "ethers";

import { useNFT } from "../lib/NFTContext";

interface Params {
  x?: string;
  y?: string;
  address?: string;
}

export const ApproveRedemption: FC = () => {
  const { isOperator, contract, signer, typedSigner, chainId } = useNFT();

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState<Params>({});
  const [sig, setSig] = useState("");

  useEffect(() => {
    (async function () {
      if (!contract || !typedSigner || !signer) return;
      if (!data.x || !data.y || !data.address) return;

      const id = await contract.coordsToId(BigNumber.from(data.x), BigNumber.from(data.y));

      console.log(await contract.name());
      console.log(chainId);
      console.log(contract.address);
      const sig = await typedSigner._signTypedData(
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

      const tx = await contract.connect(signer).redeem(id, sig, { gasLimit: 5000000 });
      console.log(await tx.wait());
      setSig(sig);
    })();
  }, [data, contract, typedSigner, signer]);

  return (
    <>
      <h2>Pre-approve Redemption</h2>

      {!contract && <div>Not Connected</div>}
      {!isOperator && <div>Not an operator</div>}

      {contract && isOperator ? (
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

          <div>Signature: {sig}</div>
        </form>
      ) : (
        <></>
      )}
    </>
  );
};
