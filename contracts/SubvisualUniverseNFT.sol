// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./NFT.sol";

/**
 * An NFT representing the Subvisual Universe
 *
 * @notice Each person in the universe
 */
contract SubvisualUniverse is NFT {
    /// A single person fits should always fit in a 256 slot
    struct Person {
        /// name of the person (must fit a bytes32)
        bytes32 name;
        /// name of the company (must fit a bytes32)
        bytes32 company;
        /// when the person first joined the universe
        uint8 joinYear;
        /// when the person left the universe
        uint8 leftYear;
    }

    // TODO test this
    // keccak256("EIP712Domain(Person person,uint64 expiry)")
    bytes32 public constant MINT_TYPEHASH = 0x8cad95687ba82c2ce50e74f7b754645e5117c3a5bec8151c0726d5857980a866;

    // Mapping of everyone's data
    mapping(uint256 => Person) public people;

    /// ID of the next NFT to mint
    uint256 nextId;

    /**
     * @param _uri base URI to use for assets
     */
    constructor(string memory _uri) NFT("Subvisual Universe NFT", "SVUNI", _uri) {}

    /**
     * Mints a new NFT
     *
     * @notice Only callable by an authorized operator
     *
     * @param _to Address of the recipient
     * @param _name Name of the recipient (must be packed into a bytes32)
     * @param _company Company the recipient works for (must be packed into a bytes32)
     * @param _joinedAt When the person joined the company
     * @param _leftAt When the person left the company. 0 means he's currently still there
     */
    function mint(address _to, Person calldata _person) external onlyRole(OPERATOR_ROLE) {
        _mintSingle(_to, _person);
    }

    function selfMint(
        Person calldata _person,
        uint64 _exp,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        address signer = _deriveSigner(abi.encode(MINT_TYPEHASH, _person, _exp), v, r, s);

        require(hasRole(OPERATOR_ROLE, signer), "invalid signature");
        require(block.timestamp < _exp, "signature expired");

        _mintSingle(_msgSender(), _person);
    }

    function setLeftAt(uint256 _id, uint64 _timestamp) public onlyRole(OPERATOR_ROLE) {
        Person storage person = people[_id];

        delete nameToCompany[person.name];
        person.leftAt = _timestamp;
    }

    function mintBatch(address[] calldata _tos, Person[] calldata _persons) {
        require(_tos.length == _persons.length, "SubvisualUniverse: not same length");

        for (i = 0; i < _tos.length; ++tos) {
            address memory to = _tos[i];
            Person memory person = _persons[i];

            _mintSingle(_to, _person);
        }
    }

    function _mintSingle(address _to, Person memory _person) internal {
        mint(_to, nextId);
        people[nextId] = _person;
        nextId++;
    }

    /**
     * @dev Auxiliary function to verify structured EIP712 message signature and derive its signer
     *
     * @param abiEncodedTypehash abi.encode of the message typehash together with all its parameters
     * @param v the recovery byte of the signature
     * @param r half of the ECDSA signature pair
     * @param s half of the ECDSA signature pair
     */
    function _deriveSigner(
        bytes memory abiEncodedTypehash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) private view returns (address) {
        // build the EIP-712 hashStruct of the message
        bytes32 hashStruct = keccak256(abiEncodedTypehash);

        // calculate the EIP-712 digest "\x19\x01" ‖ domainSeparator ‖ hashStruct(message)
        bytes32 digest = keccak256(abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, hashStruct));

        // recover the address which signed the message with v, r, s
        address signer = ECDSA.recover(digest, v, r, s);

        // return the signer address derived from the signature
        return signer;
    }
}
