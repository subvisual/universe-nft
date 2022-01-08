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

import HardhatExports from "./abis.json";

const Addresses: Record<number, string> = {
  1: "0x5738379364Fab26c7e044c02deD4ceef93333D84",
  31337: "0x6d5f81DB6e14220C0D118A7958bf6d669d085524",
};

const NFTContext = createContext<NFTContext>({ isOperator: false });

export const NFTProvider: FC = ({ children }) => {
  const { chainId, library, account } = useWeb3React<Web3Provider>();
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [isOperator, setIsOperator] = useState(false);
  const [signer, setSigner] = useState<Signer | undefined>(undefined);

  useEffect(() => {
    if (!library || !account) return;

    setSigner(library.getSigner(0));
  }, [library]);

  // set contract
  useEffect(() => {
    if (!library || !chainId) return;

    const { abi } = HardhatExports.contracts.SubvisualUniverseNFT;

    const contract = new ethers.Contract(Addresses[chainId], abi, library);
    setContract(contract);
  }, [signer, chainId, library]);

  // set isOperator
  useEffect(() => {
    (async function () {
      if (!contract || !account) return;
      const owner = await contract.owner();
      setIsOperator(owner == account);
    })();
  }, [contract, account]);

  return (
    <NFTContext.Provider
      value={{
        contract,
        isOperator,
        chainId,
        signer,
        typedSigner: signer as unknown as TypedDataSigner,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};

export const useNFT = (): NFTContext => useContext(NFTContext);
