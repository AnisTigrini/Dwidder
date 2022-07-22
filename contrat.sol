// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract SocialNetwork {
    // 1. Mapping des auteurs et leur nombre de messages.
    mapping(address => uint32) authors;
    // 1.1 Nous avons besoin d'une liste d'addresses pour faciliter le retour du mapping ci-dessus.
    address[] addressList;
    // 2. Liste des messages
    string[] messages;
    // 2.1 Créer un événement à chaque fois qu'un message se fait rajouter sur la blockchain.
    event newMessage (
        string m
    );
    // 2.2 Créer un événement chaque fois qu'on met à jour les contributeurs.
    event contributorsUpdate (
        address from,
        uint n
    );

    // 3. Adresse de la personne qui déploie le contrat.
    address authorAddress;

    constructor() {
        authorAddress = msg.sender;
    }

    // 4. Définir un modifier pour détruire le contrat.
    modifier onlyOwner {
        require(msg.sender == authorAddress, "Only the owner of the contract can destroy it.");
        _;
    }

    // 5. Détruire le contrat (seulement l'autheur du contrat peut le faire).
    function destroy() public onlyOwner {
        selfdestruct(payable(authorAddress));
    }

    // 6. Retourner la liste des messages.
    function getMessages() public view returns(string[] memory){
        return messages;
    }

    // 7. Eviter les vulnérabilités liés au débordement débordements.
    // On veut éviter de montrer qu'un utilisateur à -1 message par débordement.
    function isOverflow(uint32 i) private pure returns(bool) {
        if(i >= 0 && i <= 4294967295) {
            return false;
        }
        return true;
    }

    // 8. Vérifier si une addresse est présente dans notre liste d'addresses
    function isAddressInList(address adr) public view returns(bool) {
        for (uint i = 0; i < addressList.length; i++) {
            if (addressList[i] == adr) {
                return true;
            }
        }

        return false;
    }

    // 9. Retourner notre mapping d'addresses de contributeurs.
    function getContributors() public view returns(address[] memory, uint[] memory) {
        uint[] memory numberContributionList = new uint[](addressList.length);

        for(uint i = 0; i < addressList.length; i++) {
            numberContributionList[i] = authors[addressList[i]];
        }

        return(addressList, numberContributionList);
    }

    // 10. Fonction Pour insérer un message dans la blockchain.
    function insertMessage(string memory m) payable public {
        // CHECKS
        // 10.1 Vérfier que le message est non vide et que l'on paye bien 10 000 gwei.
        require(msg.value == 0.00001 ether, "You need to pay 10 000 Gwei to do this!");
        require(bytes(m).length != 0, "We cannot enter an empty message!");
        
        // EFFETS
        // 10.2 Mettre le message dans la liste.
        messages.push(m);

        // 10.3 Rajouter l'addresse si elle n'est pas déjà présente dans la liste.
        if (isAddressInList(msg.sender) == false) {
            addressList.push(msg.sender);
        }

        // 10.4 S'assurer qu'on n'a pas de débordement pour le nombre de message. 
        uint32 currentNumberOfMessages = authors[msg.sender];
        authors[msg.sender] = isOverflow(currentNumberOfMessages + 1) ? currentNumberOfMessages: currentNumberOfMessages + 1;

        // INTERACTIONS
        // 10.5 Payer à l'auteur du contrat.
        payable(authorAddress).transfer(msg.value);

        // 10.6 Émettre les événement au front-end.
        emit newMessage(m);
        emit contributorsUpdate(msg.sender, currentNumberOfMessages + 1);
    }
}