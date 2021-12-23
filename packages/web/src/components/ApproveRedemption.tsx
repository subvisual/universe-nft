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
  const [redeemCode, setRedeemCode] = useState("");

  useEffect(() => {
    (async function () {
      if (!contract || !typedSigner || !signer) return;
      if (!data.x || !data.y || !data.address) return;

      const id = await contract.coordsToId(
        BigNumber.from(data.x),
        BigNumber.from(data.y)
      );
      const domain = {
        name: await contract.name(),
        version: "1.0.0",
        chainId,
        verifyingContract: contract.address,
      };
      const types = {
        Mint: [
          { name: "account", type: "address" },
          { name: "tokenId", type: "uint256" },
        ],
      };
      const value = { account: data.address, tokenId: id };

      const sig = await typedSigner._signTypedData(domain, types, value);

      setRedeemCode(`${data.x}-${data.y}-${sig}`);
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

          {redeemCode.length > 0 && (
            <div>
              <a href={`http://localhost:3000?redeemCode=${redeemCode}`}>
                Redeem URL
              </a>
            </div>
          )}
        </form>
      ) : (
        <></>
      )}
    </>
  );
};
