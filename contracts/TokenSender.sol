// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract TokenSender {
    error InvalidSignatureSource();
    error TransferFailed();
    error TxAlreadyExecuted();

    using ECDSA for bytes32;

    mapping(bytes32 => bool) executed;

    function transfer(address sender, uint256 amount, address recipient, address tokenContract, uint256 nonce, bytes memory sig) public {
        bytes32 messageHash = getHash(sender, amount, recipient, tokenContract, nonce);
        bytes32 signedMessageHash = messageHash.toEthSignedMessageHash();

        if (executed[signedMessageHash]) revert TxAlreadyExecuted();

        address signer = signedMessageHash.recover(sig);

        if (signer != signer) revert InvalidSignatureSource();
        
        if (sender != signer) revert InvalidSignatureSource();

        executed[signedMessageHash] = true;
        bool sent = ERC20(tokenContract).transferFrom(sender, recipient, amount);
        if (!sent) revert TransferFailed();
    }

    function getHash(address sender, uint256 amount, address recipient, address tokenContract, uint256 nonce) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(sender, amount, recipient, tokenContract, nonce));
    }
}



