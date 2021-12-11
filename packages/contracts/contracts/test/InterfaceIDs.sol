// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {IAccessControl} from "@openzeppelin/contracts/access/IAccessControl.sol";

library InterfaceIDs {
    function ierc721() public pure returns (bytes4) {
        return type(IERC721).interfaceId;
    }

    function ierc721Enumerable() public pure returns (bytes4) {
        return type(IERC721Enumerable).interfaceId;
    }

    function ierc721Metadata() public pure returns (bytes4) {
        return type(IERC721Metadata).interfaceId;
    }

    function iaccessControl() public pure returns (bytes4) {
        return type(IAccessControl).interfaceId;
    }

    function ierc165() public pure returns (bytes4) {
        return type(IERC165).interfaceId;
    }
}
