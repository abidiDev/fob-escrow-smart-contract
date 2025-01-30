// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EscrowFOB {
    address public buyer;
    address public seller;
    uint public amount;
    bool public isShipped;

    constructor(address _seller) payable {
        buyer = msg.sender;
        seller = _seller;
        amount = msg.value;
    }

    function confirmShipment() public {
    require(msg.sender == seller, "Only seller can confirm shipment");
    require(!isShipped, "Shipment already confirmed");
    
    isShipped = true;
}

}
