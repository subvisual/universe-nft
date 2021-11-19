// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC721, ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC721Enumerable, ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import {IAccessControl, AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

import "hardhat/console.sol";

/**
 * A base NFT contract, with generic Enumerable, Metadata, and ERC165 capabilities
 */
abstract contract NFT is ERC721Enumerable, AccessControl {
    //
    // Constants
    //

    /// Role with permissions to set metadata and URIs
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR");

    //
    // State
    //

    // NFT URI
    string private uri;

    //
    // Events
    //

    /// Emitted when the base URI changes
    event BaseURIUpdated(string newURI);

    //
    // Constructor
    //

    /**
     * @param _uri the base URI
     */
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri
    ) ERC721(_name, _symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(OPERATOR_ROLE, _msgSender());

        uri = _uri;

        emit BaseURIUpdated(_uri);
    }

    //
    // Public API
    //

    /**
     * Updates the base URI
     *
     * @notice Only callable by an authorized operator
     *
     * @param _uri new URI for the token
     */
    function setURI(string memory _uri) public onlyRole(OPERATOR_ROLE) {
        uri = _uri;

        emit BaseURIUpdated(_uri);
    }

    function mint(address _to, uint256 _tokenId) public virtual onlyRole(OPERATOR_ROLE) {
        _safeMint(_to, _tokenId);
    }

    //
    // ERC721
    //

    /**
     * Gets the base URI
     *
     * @return the base URI
     */
    function _baseURI() internal view override(ERC721) returns (string memory) {
        return uri;
    }

    //
    // ERC165
    //
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Enumerable).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            interfaceId == type(IAccessControl).interfaceId;
    }
}
