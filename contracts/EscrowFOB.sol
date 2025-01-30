// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title EscrowFOB
 * @dev Ce smart contract met en place un escrow basé sur l'incoterm FOB.
 * L'acheteur dépose des fonds, le vendeur confirme l'expédition et les fonds sont libérés.
 */
contract EscrowFOB {

    // Adresse de l'acheteur (celui qui dépose les fonds)
    address public buyer;

    // Adresse du vendeur (celui qui reçoit les fonds après expédition)
    address public seller;

    // Montant total bloqué dans l'escrow
    uint public amount;

    // État du contrat : la marchandise a-t-elle été expédiée ?
    bool public isShipped;

    event ShipmentConfirmed(address indexed seller);
    event FundsReleased(address indexed buyer, uint amount);

    /**
     * @dev Constructeur qui initialise le contrat avec l'acheteur et le vendeur.
     * L'acheteur envoie les fonds lors de la création du contrat.
     * @param _seller Adresse du vendeur qui recevra les fonds.
     */
    constructor(address _seller) payable {
        require(msg.value > 0, "Funds must be greater than zero"); 
        buyer = msg.sender; 
        seller = _seller; 
        amount = msg.value; 
    }

    
    /**
     * @dev Permet au vendeur de confirmer que la marchandise a été expédiée.
     * Émet un événement `ShipmentConfirmed`.
     */
    function confirmShipment() public {
        require(msg.sender == seller, "Only seller can confirm shipment"); 
        require(!isShipped, "Shipment already confirmed"); 
        isShipped = true; 
        emit ShipmentConfirmed(seller); 
    }

    
    /**
     * @dev Permet à l'acheteur de libérer les fonds après confirmation de l'expédition.
     * Émet un événement `FundsReleased`.
     */
    function releaseFunds() public {
        require(msg.sender == buyer, "Only buyer can release funds"); 
        require(isShipped, "Shipment must be confirmed before release"); 

        payable(seller).transfer(amount); 
        emit FundsReleased(buyer, amount); 
    }
}
