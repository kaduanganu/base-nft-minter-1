// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BaseMinter is ERC721A, Ownable {
    uint256 public constant MAX_SUPPLY = 55555;
    uint256 public constant MINT_PRICE = 0.00005 ether;
    uint256 public constant MAX_PER_WALLET = 5;

    string public baseURI;

    constructor(string memory _initialBaseURI) ERC721A("BaseNewbie", "BASE") Ownable(msg.sender) {
        baseURI = _initialBaseURI;
    }

    function mint(uint256 quantity) external payable {
        require(totalSupply() + quantity <= MAX_SUPPLY, "Sold out");
        require(_numberMinted(msg.sender) + quantity <= MAX_PER_WALLET, "Exceeds wallet limit");
        require(msg.value >= MINT_PRICE * quantity, "Insufficient funds");

        _mint(msg.sender, quantity);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}