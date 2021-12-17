import type { Web3Provider } from "@ethersproject/providers";
import type { Contract, Signer } from "ethers";
import type { TypedDataSigner } from "@ethersproject/abstract-signer";
import type { FC } from "react";

import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

import { useWeb3React } from "@web3-react/core";

interface NFTContext {
  contract?: Contract;
  signer?: Signer;
  typedSigner?: TypedDataSigner;
  isOperator: boolean;
  chainId?: number;
}

const Addresses: Record<number, string> = {
  1337: "0xD2F960DD8333C408aAEd1924452D2b99b743fC7A",
};

const ABI: string[] = [
  "function OPERATOR_ROLE() view returns (bytes32)",
  "function name() view returns (string)",
  "function hasRole(bytes32 role, address account) view returns (bool)",
  "function coordsToId(uint32 x, uint32 y) view returns (uint256)",
  "function idToCoords(uint256 id) view returns(uint32 x,uint32 y)",
  "function redeem(uint256 _tokenId,bytes _sig)",
];

const NFTContext = createContext<NFTContext>({ isOperator: false });

export const NFTProvider: FC = ({ children }) => {
  const { chainId, library, account } = useWeb3React<Web3Provider>();
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [isOperator, setIsOperator] = useState(false);
  const [signer, setSigner] = useState<Signer | undefined>(undefined);

  // set signer
  useEffect(() => {
    if (!library) return;

    setSigner(library.getSigner(0));
  }, [library]);

  // set contract
  useEffect(() => {
    if (!library || !chainId) return;

    const contract = new ethers.Contract(Addresses[chainId], ABI, library);
    setContract(contract);
  }, [signer, chainId, library]);

  // set isOperator
  useEffect(() => {
    (async function () {
      if (!contract) return;
      const role = await contract.OPERATOR_ROLE();
      setIsOperator(await contract.hasRole(role, account));
    })();
  }, [contract]);

  return (
    <NFTContext.Provider
      value={{ contract, isOperator, chainId, signer, typedSigner: signer as unknown as TypedDataSigner }}
    >
      {children}
    </NFTContext.Provider>
  );
};

export const useNFT = (): NFTContext => useContext(NFTContext);
