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
  31337: "0x9ce37148F5E347E55857C22c012B0741e4733130",
};

const ABI: string[] = [
  // IERC721
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 id) view returns (address)",

  // IERC721Metadata
  "function tokenURI(uint256 id) view returns (string)",

  // IERC721Enumerable
  "function totalSupply() view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
  "function tokenByIndex(uint256 index) view returns (uint256)",

  // SubvisualUniverseNFT
  "function OPERATOR_ROLE() view returns (bytes32)",
  "function name() view returns (string)",
  "function width() view returns (uint256)",
  "function height() view returns (uint256)",
  "function tokenData(uint256 tokenId) view returns (tuple(uint256 id, address owner, string uri))",
  "function tokenDataByIndex(uint256 idx) view returns (tuple(uint256 id, address owner, string uri))",
  "function tokensDataByRange(uint256 _from, uint256 _max) view returns (tuple(uint256 id, address owner, string uri)[])",
  "function hasRole(bytes32 role, address account) view returns (bool)",
  "function coordsToId(uint16 x, uint16 y) view returns (uint256)",
  "function idToCoords(uint256 id) view returns(uint32 x,uint32 y)",
  "function redeem(uint256 _tokenId, bytes _sig)",
];

const NFTContext = createContext<NFTContext>({ isOperator: false });

export const NFTProvider: FC = ({ children }) => {
  const { chainId, library, account } = useWeb3React<Web3Provider>();
  const [contract, setContract] = useState<Contract | undefined>(undefined);
  const [isOperator, setIsOperator] = useState(false);
  const [signer, setSigner] = useState<Signer | undefined>(undefined);

  // set signer
  useEffect(() => {
    if (!library || !account) return;

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
      if (!contract || !account) return;
      const role = await contract.OPERATOR_ROLE();
      setIsOperator(await contract.hasRole(role, account));
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
