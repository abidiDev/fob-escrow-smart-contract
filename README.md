# Escrow Smart Contract FOB

|   Nom   | Prénom |
|---------|--------|
|   Doe   |  Jane  |
|   Doe   |  John  |

Le TP est à réaliser par groupe de 2.

## Présentation

Les Incoterms [1] régissent les transactions commerciales internationales en définissant les responsabilités des vendeurs et des acheteurs concernant la livraison des marchandises, les risques de transport, les frais et les obligations douanières. Un Smart Contract, que nous appelerons maintenant Escrow Smart Contract [5] peut automatiser les paiements en fonction des conditions spécifiques liées à un Incoterm particulier, comme le transfert de propriété ou le risque une fois que la marchandise a atteint un point défini (par exemple, lors de la remise à un transporteur ou à l'arrivée à un port).

Le projet consiste à concevoir un Escrow Smart Contract, où les paiements sont automatiquement déclenchés en fonction de la conformité aux termes de l'Incoterm choisi (FOB (Free on Board) [2], CIF (Cost, Insurance, Freight) [3] ou encore DAP (Delivered at Place)) [4]. L'Escrow Smart Contract verrouille les fonds de l'acheteur, qui ne seront déploqués qu'une fois que certaines conditions de livraison ou de transfert de risques, définies par l'incoterm, seront satisfaites. Pour ce projet, on s'intéresse uniquement à l'Incoterm FOB.

- [1] « Les nouvelles règles Incoterms® 2020 et la valeur en douane », Le portail de la direction générale des douanes et droits indirects. [En ligne]. Disponible sur: http://www.douane.gouv.fr/les-nouvelles-regles-incotermsr-2020-et-la-valeur-en-douane
- [2] « Ce qu’il faut savoir sur l’incoterm FOB ». [En ligne]. Disponible sur: https://fiches-pratiques.chefdentreprise.com/Thematique/export-1101/FichePratique/Ce-qu-il-faut-savoir-sur-l-incoterm-FOB-361564.htm
- [3] « Incoterm CIF : une solution adaptée aux formalités douanières – SupplyChainInfo ». [En ligne]. Disponible sur: https://www.supplychaininfo.eu/incoterm-cif/
- [4] « Qu’est-ce que l’Incoterm DAP ? – SupplyChainInfo ». [En ligne]. Disponible sur: https://www.supplychaininfo.eu/incoterm-dap/
- [5] V. Iehlé, E. Lécuyer, et M. Vernay, « Escrow Smart Contracts et Risque de Liquidité dans le Commerce International Maritime », juin 2023. [En ligne]. Disponible sur: https://shs.hal.science/halshs-04124060

## Restitution

Il est nécessaire de tester le Smart Contract, il est donc demandé de rédiger des tests unitaires ainsi que de la documentation à propos du Smart Contract mais aussi de l'application décentralisée.
