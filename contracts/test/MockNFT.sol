// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {NFT} from "../NFT.sol";

contract MockNFT is NFT {
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri
    ) NFT(_name, _symbol, _uri) {}
}
