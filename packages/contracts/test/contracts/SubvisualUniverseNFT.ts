import { ethers } from "hardhat";
import { expect } from "chai";

import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { SubvisualUniverseNFT } from "@root/typechain-types";

import { supportsInterface, behavesAsERC165 } from "../shared/erc165";

const { BigNumber } = ethers;

describe("SubvisualUniverseNFT", () => {
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;

  let nft: SubvisualUniverseNFT;

  let chainId: number;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("SubvisualUniverseNFT");

    nft = (await NFT.deploy(
      "Subvisual Universe NFT",
      "SBVSL-UNI",
      "https://universe.subvisual.com/nft/",
      255,
      255,
      owner.address
    )) as SubvisualUniverseNFT;

    chainId = (await ethers.provider.getNetwork()).chainId;
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

  describe("coordsToId", () => {
    it("correctly converts coords to ids", async () => {
      expect(await nft.coordsToId(1, 1)).to.equal(BigNumber.from("0x010001"));
      expect(await nft.coordsToId(2, 1)).to.equal(BigNumber.from("0x020001"));
      expect(await nft.coordsToId(2, 2)).to.equal(BigNumber.from("0x020002"));
    });
  });

  describe("idToCoords", () => {
    it("correctly converts ids to coords", async () => {
      const r1 = await nft.idToCoords(BigNumber.from("0x010001"));
      expect(r1.x).to.equal(1);
      expect(r1.y).to.equal(1);

      const r2 = await nft.idToCoords(BigNumber.from("0x020001"));
      expect(r2.x).to.equal(2);
      expect(r2.y).to.equal(1);

      const r3 = await nft.idToCoords(BigNumber.from("0x010002"));
      expect(r3.x).to.equal(1);
      expect(r3.y).to.equal(2);
    });
  });

  describe("redeem", () => {
    it("can redeem tokens with a valid EIP712 approval", async () => {
      const id = await nft.coordsToId(BigNumber.from("1"), BigNumber.from("2"));
      const domain = {
        name: await nft.name(),
        version: "1.0.0",
        chainId,
        verifyingContract: nft.address,
      };
      const types = {
        Mint: [
          { name: "account", type: "address" },
          { name: "tokenId", type: "uint256" },
        ],
      };
      const value = { account: alice.address, tokenId: id.toString() };
      const sig = await owner._signTypedData(domain, types, value);

      const tx = await nft.connect(alice).redeem(id, sig);

      expect(await nft.ownerOf(id)).to.equal(alice.address);
    });

    it("does not allow redeeming the wrong NFT", async () => {
      const signature = await owner._signTypedData(
        // Domain
        {
          name: await nft.name(),
          version: "1.0.0",
          chainId,
          verifyingContract: nft.address,
        },
        // Types
        {
          Mint: [
            { name: "account", type: "address" },
            { name: "tokenId", type: "uint256" },
          ],
        },
        // Value
        { account: alice.address, tokenId: 62 }
      );

      const action = nft.connect(alice).redeem(63, signature);

      expect(action).to.be.reverted;
    });

    it("does not allow the wrong account to redeem", async () => {
      const signature = await owner._signTypedData(
        // Domain
        {
          name: await nft.name(),
          version: "1.0.0",
          chainId,
          verifyingContract: nft.address,
        },
        // Types
        {
          Mint: [
            { name: "account", type: "address" },
            { name: "tokenId", type: "uint256" },
          ],
        },
        // Value
        { account: alice.address, tokenId: 62 }
      );

      const action = nft.connect(bob).redeem(62, signature);

      expect(action).to.be.reverted;
    });
  });

  describe("redeemFor", () => {
    it("is callable by a minter role", async () => {
      await nft.redeemFor(alice.address, 0);

      expect(await nft.ownerOf(0)).to.eq(alice.address);
    });

    it("is not callable by a non-owner", async () => {
      const action = nft.connect(alice).redeemFor(alice.address, 0);

      await expect(action).to.be.reverted;
    });
  });

  describe("tokenURI", () => {
    it("provides the correct URI", async () => {
      await nft.redeemFor(alice.address, 0);
      const uri = await nft.tokenURI(0);

      expect(uri).to.equal("https://universe.subvisual.com/nft/0");
    });
  });

  describe("grantRole", () => {
    it("admins can assign new operators", async () => {
      await nft
        .connect(owner)
        .grantRole(await nft.OPERATOR_ROLE(), alice.address);
    });

    it("non-admins can't assign new operators", async () => {
      const action = nft
        .connect(alice)
        .grantRole(await nft.OPERATOR_ROLE(), alice.address);

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
