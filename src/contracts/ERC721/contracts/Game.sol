// contracts/NonFunToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Game is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Constructor will be called on contract creation
    constructor() ERC721("Game", "DIN") {}


    // Allows minting of a new NFT
    function mintCollectionNFT(
        address collector,
    ) public {
        uint tokenId = _tokenIds.current();
        _safeMint(collector, tokenId);
        _tokenIds.increment();
    }
}
