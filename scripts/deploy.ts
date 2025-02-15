import { ethers } from "hardhat";

async function main() {
    const signers = await ethers.getSigners();
    if (signers.length < 2) {
        throw new Error("❌ Pas assez de comptes disponibles. Assure-toi d'avoir au moins 2 comptes.");
    }

    const deployer = signers[0]; // Acheteur
    const seller = signers[1]; // Vendeur

    console.log("🚀 Déploiement avec Buyer:", deployer.address);
    console.log("🛍 Seller:", seller.address);

    const EscrowFOB = await ethers.getContractFactory("EscrowFOB");
    const escrow = await EscrowFOB.deploy(seller.address, { value: ethers.parseEther("1") });

    await escrow.waitForDeployment();
    const contractAddress = await escrow.getAddress();
    console.log("✅ Contrat déployé avec succès !");
    console.log("📍 Adresse du contrat:", contractAddress);

    console.log(`🎯 Détails :
    - 👤 Acheteur: ${deployer.address}
    - 🛍 Vendeur: ${seller.address}
    - 💰 Montant: 1 ETH`);
}

main().catch((error) => {
    console.error("❌ Erreur de déploiement:", error);
    process.exitCode = 1;
});
