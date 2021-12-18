// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC721, ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC721Enumerable, ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import {IAccessControl, AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

/**
 * An NFT representing the Subvisual Universe
 */
contract SubvisualUniverseNFT is ERC721Enumerable, AccessControl, EIP712 {
    //
    // Constants
    //

    /// Role with permissions to set metadata and URIs
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR");

    // Mint approval EIP712 TypeHash
    bytes32 public constant MINT_TYPEHASH = keccak256("Mint(address account,uint256 tokenId)");

    //
    // State
    //

    /// Base URI for all NFTs
    string public baseURI;

    uint16 public width;
    uint16 public height;

    //
    // Events
    //

    /// Emitted when the base URI changes
    event BaseURIUpdated(string newBaseURI);

    /**
     * @param _name NFT name
     * @param _symbol NFT symbol
     * @param _newBaseURI base URI to use for assets
     */
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _newBaseURI,
        uint16 _width,
        uint16 _height
    ) ERC721(_name, _symbol) EIP712(_name, "1.0.0") {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(OPERATOR_ROLE, _msgSender());

        baseURI = _newBaseURI;

        width = _width;
        height = _height;

        emit BaseURIUpdated(_newBaseURI);
    }

    //
    // Public API
    //

     function coordsToId(uint16 x, uint16 y) external pure returns (uint256) {
         return (uint256(x) << 16) + uint256(y);
     }

     function idToCoords(uint256 id) public pure returns(uint16 x,uint16 y) {
         x = uint16(id >> 16);
         y = uint16(id & ((2 << 16) - 1));
     }

    /**
     * Updates the base URI
     *
     * @notice Only callable by an authorized operator
     *
     * @param _newBaseURI new base URI for the token
     */
    function setBaseURI(string memory _newBaseURI) public onlyRole(OPERATOR_ROLE) {
        baseURI = _newBaseURI;

        emit BaseURIUpdated(_newBaseURI);
    }

    /**
     * Mints a new NFT
     *
     * @param _tokenId token ID to mint
     * @param _sig EIP712 signature to validate
     */
    function redeem(uint256 _tokenId, bytes calldata _sig) external {
        require(inBoundaries(_tokenId), "not inside the grid");

        require(_verify(_hash(_msgSender(), _tokenId), _sig));
        _safeMint(_msgSender(), _tokenId);
    }

    function inBoundaries(uint256 _tokenId) public view returns (bool) {
        (uint16 x, uint16 y) = idToCoords(_tokenId);

        return (x < width && y < height);
    }


    /**
     * Mints a new NFT on behalf of an account
     *
     * @notice Only callable by an approved operator
     *
     * @param _to Address of the recipient
     * @param _tokenId token ID to mint
     */
    function redeemFor(address _to, uint256 _tokenId) external onlyRole(OPERATOR_ROLE) {
        _safeMint(_to, _tokenId);
    }

    //
    // ERC721
    //
    function _baseURI() internal view override(ERC721) returns (string memory) {
        return baseURI;
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

    //
    // Internal API
    //

    /**
     * Computes the EIP712 Hash of a mint authorization
     *
     * @param _account Account who will mint the NFT
     * @param _tokenId ID of token to mint
     * @return The resulting EIP712 Hash
     */
    function _hash(address _account, uint256 _tokenId) internal view returns (bytes32) {
        return _hashTypedDataV4(keccak256(abi.encode(MINT_TYPEHASH, _account, _tokenId)));
    }


    /**
     * Verifies a mint approval
     *
     * @param _digest The EIP712 hash digest
     * @param _sig The signature to check
     * @return true if the signature matches the hash, and corresponds to a valid minter role
     */
    function _verify(bytes32 _digest, bytes memory _sig) internal view returns (bool) {
        return hasRole(OPERATOR_ROLE, ECDSA.recover(_digest, _sig));
    }
}
