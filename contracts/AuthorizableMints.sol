// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import {NFT} from "./NFT.sol";

abstract contract AuthorizableMints {
    struct EIP712Domain {
        string name;
        string version;
        uint256 chainId;
        address verifyingContract;
    }

    struct MintApproval {
        bytes32 name;
        bytes32 company;
        bytes32 nonce;
        uint64 exp;
    }

    /// Used authorizations
    mapping(bytes32 => bool) private nonces;

    bytes32 public constant EIP712DOMAIN_TYPEHASH =
        keccak256("EIP712Domain(string name,uint256 chainId,address verifyingContract)");

    bytes32 public constant approval_TYPEHASH = keccak256("MintApproval(bytes32 name,bytes32 company)");

    /// EIP-712 domain separator
    bytes32 public immutable DOMAIN_SEPARATOR;

    constructor(string memory _name) {
        DOMAIN_SEPARATOR = _eip712hash(
            EIP712Domain({name: _name, version: "1", chainId: 1, verifyingContract: address(this)})
        );
    }

    function _recover(
        MintApproval calldata approval,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal returns (address) {
        require(block.timestamp <= approval.exp, "EIP712: signature expired");
        require(!nonces[approval.nonce], "EIP712: signature already used");

        bytes32 digest = keccak256(abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, _eip712hash(approval)));

        nonces[approval.nonce] = true;

        return ecrecover(digest, v, r, s);
    }

    function _eip712hash(EIP712Domain memory eip712Domain) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    EIP712DOMAIN_TYPEHASH,
                    keccak256(bytes(eip712Domain.name)),
                    keccak256(bytes(eip712Domain.version)),
                    eip712Domain.chainId,
                    eip712Domain.verifyingContract
                )
            );
    }

    function _eip712hash(MintApproval calldata approval) internal pure returns (bytes32) {
        return keccak256(abi.encode(approval_TYPEHASH, approval.name, approval.company, approval.nonce, approval.exp));
    }
}
