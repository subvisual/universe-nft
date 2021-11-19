// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import {NFT} from "./NFT.sol";
import {AuthorizableMints} from "./AuthorizableMints.sol";

/**
 * An NFT representing the Subvisual Universe
 *
 * @notice Each person in the universe
 */
contract SubvisualUniverse is NFT, AuthorizableMints {
    /// A single person fits should always fit in a 256 slot
    struct Metadata {
        /// name of the person (must fit a bytes32)
        bytes32 name;
        /// name of the company (must fit a bytes32)
        bytes32 company;
        /// when the person first joined the universe
        uint64 joinAt;
        /// when the person left the universe
        uint64 leftAt;
    }

    // Mapping of everyone's data
    mapping(uint256 => Metadata) public metadata;

    /// Used authorizations
    mapping(bytes32 => bool) private nonces;

    uint256 nextId;

    /**
     * @param _uri base URI to use for assets
     */
    constructor(string memory _uri)
        NFT("Subvisual Universe NFT", "SVUNI", _uri)
        AuthorizableMints("SubvisualUniverseNFT")
    {}

    /**
     * Mints a new NFT
     *
     * @notice Only callable by an authorized operator
     *
     * @param _to Address of the recipient
     * @param _person person's metadata
     */
    function mint(address _to, Metadata calldata _person) external onlyRole(OPERATOR_ROLE) {
        _mintSingle(_to, _person);
    }

    function mintWithApproval(
        MintApproval calldata _approval,
        Metadata calldata _metadata,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        address signer = _recover(_approval, v, r, s);

        require(hasRole(OPERATOR_ROLE, signer), "SVUNI: invalid signature");
        require(_approval.name == _metadata.name, "SVUNI: metadata name does not match approval");
        require(_approval.company == _metadata.company, "SVUNI: metadata company does not match approval");

        _mintSingle(_msgSender(), _metadata);
    }

    function mintBatch(address[] calldata _tos, Metadata[] calldata _metadatas) external {
        require(_tos.length == _metadatas.length, "SVUNI: not same length");

        for (uint8 i = 0; i < _tos.length; ++i) {
            address to = _tos[i];
            Metadata calldata meta = _metadatas[i];

            _mintSingle(to, meta);
        }
    }

    function _mintSingle(address _to, Metadata memory _metadata) internal {
        mint(_to, nextId);
        metadata[nextId] = _metadata;
        nextId++;
    }

    function setLeftAt(uint256 _id, uint64 _timestamp) public onlyRole(OPERATOR_ROLE) {
        Metadata storage meta = metadata[_id];

        meta.leftAt = _timestamp;
    }
}
