import { ethers } from "hardhat";
import { expect } from "chai";

import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { SubvisualUniverse } from "@root/typechain-types";

import { supportsInterface, behavesAsERC165 } from "../shared/erc165";

describe("SubvisualUniverse", () => {
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;

  let nft: SubvisualUniverse;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("SubvisualUniverse");

    nft = (await NFT.deploy("Subvisual NFT", "SNFT", "https://universe.subvisual.com/nft/")) as SubvisualUniverse;
  });

  describe("setBaseURI", () => {
    it("can be set by the operator", async () => {
      await nft.connect(owner).setBaseURI("something else");
    });

    it("cannot be set by a non-operator", async () => {
      const action = nft.connect(alice).setBaseURI("something else");

      await expect(action).to.be.revertedWith(
        `AccessControl: account ${alice.address.toLowerCase()} is missing role ${await nft.OPERATOR_ROLE()}`
      );
    });

    it("can be set by an approved operator", async () => {
      await nft.grantRole(await nft.OPERATOR_ROLE(), alice.address);

      await nft.connect(alice).setBaseURI("something else");
    });
  });

  describe("grantRole", () => {
    it("admins can assign new operators", async () => {
      await nft.connect(owner).grantRole(await nft.OPERATOR_ROLE(), alice.address);
    });

    it("non-admins can't assign new operators", async () => {
      const action = nft.connect(alice).grantRole(await nft.OPERATOR_ROLE(), alice.address);

      await expect(action).to.be.revertedWith(
        `AccessControl: account ${alice.address.toLowerCase()} is missing role ${await nft.DEFAULT_ADMIN_ROLE()}`
      );
    });
  });

  describe("supportsInterface", () => {
    it("supports the IERC721 interface", async () => {
      expect(await supportsInterface(nft, "IERC721")).to.be.true;
    });

    it("supports the IERC721Enumerable interface", async () => {
      expect(await supportsInterface(nft, "IERC721Enumerable")).to.be.true;
    });

    it("supports the IERC721Metadata interface", async () => {
      expect(await supportsInterface(nft, "IERC721Metadata")).to.be.true;
    });

    it("supports the IAccessControl interface", async () => {
      expect(await supportsInterface(nft, "IAccessControl")).to.be.true;
    });
  });
});
