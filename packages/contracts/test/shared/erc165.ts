import chai from "chai";
import { ethers } from "hardhat";

import type { ERC165, InterfaceIDs } from "@root/typechain-types";

export async function behavesAsERC165(contract: ERC165): Promise<boolean> {
  return (
    (await contract.supportsInterface("0x01ffc9a7")) &&
    !(await contract.supportsInterface("0xffffffff"))
  );
}

export async function supportsInterface(
  contract: ERC165,
  interf: string
): Promise<boolean> {
  const InterfaceIDsFactory = await ethers.getContractFactory("InterfaceIDs");
  const interfaceIDs = (await InterfaceIDsFactory.deploy()) as InterfaceIDs;

  let id = await interfaceIDs.ierc165();

  switch (interf) {
    case "IERC721":
      id = await interfaceIDs.ierc721();
      break;
    case "IERC721Enumerable":
      id = await interfaceIDs.ierc721Enumerable();
      break;
    case "IERC721Metadata":
      id = await interfaceIDs.ierc721Metadata();
      break;
    case "IAccessControl":
      id = await interfaceIDs.iaccessControl();
      break;
    case "IERC165":
      id = await interfaceIDs.ierc165();
      break;
  }

  return await contract.supportsInterface(id);
}
