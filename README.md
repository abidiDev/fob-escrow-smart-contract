# 🏗️ EscrowFOB - Smart Contract d'Escrow basé sur FOB

Ce projet implémente un contrat intelligent de type *Escrow* basé sur l'incoterm **FOB** (*Free On Board*).  
L'objectif est de sécuriser une transaction entre un acheteur et un vendeur :

- **L'acheteur** dépose les fonds dans le contrat.
- **Le vendeur** confirme l'expédition.
- **L'acheteur** libère les fonds après confirmation.

## 🚀 Technologies utilisées

- Solidity (`^0.8.20`)
- Hardhat (déploiement et tests)
- React & ethers.js (interface utilisateur)

---

## 📦 Installation

1️⃣ **Clonez le projet :**
```bash
git clone https://github.com/ton-repo/escrow-fob.git
cd escrow-fob
## 📦 Installation

### 1️⃣ Clonez le projet :
```bash
git clone https://github.com/ton-repo/escrow-fob.git
cd escrow-fob
```

### 2️⃣ Installez les dépendances :
```bash
npm install
```

### 3️⃣ Compilez le smart contract :
```bash
npx hardhat compile
```

### 4️⃣ Lancez un nœud local Hardhat :
```bash
npx hardhat node
```

### 5️⃣ Déployez le contrat sur le réseau local :
```bash
npx hardhat run scripts/deploy.ts --network localhost
```

## 🖥️ Lancer l'interface utilisateur

L'interface utilisateur permet aux utilisateurs (acheteur et vendeur) d'interagir avec le smart contract.

### 1️⃣ Accédez au dossier du frontend :
```bash
cd escrow-frontend
```

### 2️⃣ Installez les dépendances :
```bash
npm install
```

### 3️⃣ Lancez l'application React :
```bash
npm start
```

L'interface sera accessible sur http://localhost:3000.

## 🧪 Exécuter les tests unitaires

Des tests unitaires ont été mis en place pour valider les fonctionnalités du contrat intelligent.

### 1️⃣ Exécutez les tests avec Hardhat :
```bash
npx hardhat test
```

