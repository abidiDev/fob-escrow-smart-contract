import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import EscrowABI from "../../../artifacts/contracts/EscrowFOB.sol/EscrowFOB.json";

const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const contractABI = EscrowABI.abi;

const SellerDashboard = () => {
    const [account, setAccount] = useState("");
    const [contractData, setContractData] = useState({
        buyer: "",
        seller: "",
        isShipped: false,
        balance: "0"
    });
    const [error, setError] = useState("");

    useEffect(() => {
        if (!window.ethereum) return;

        const fetchContractData = async () => {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, contractABI, signer);

                const [buyer, seller, isShipped] = await Promise.all([
                    contract.buyer(),
                    contract.seller(),
                    contract.isShipped()
                ]);
                const balance = await provider.getBalance(contractAddress);

                setAccount(await signer.getAddress());
                setContractData({ buyer, seller, isShipped, balance: ethers.formatEther(balance) });
            } catch (error) {
                setError(error.message);
            }
        };

        fetchContractData();
    }, []);

    const confirmShipment = async () => {
        if (!window.ethereum) {
            setError("MetaMask n'est pas installé.");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            if (account !== contractData.seller) {
                throw new Error("Seul le vendeur peut confirmer l'expédition.");
            }

            const tx = await contract.confirmShipment();
            await tx.wait();
            alert("Expédition confirmée !");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Tableau de bord Vendeur</h2>
            <p><strong>Compte :</strong> {account}</p>
            <p><strong>Expédition confirmée :</strong> {contractData.isShipped ? "Oui ✅" : "Non ❌"}</p>
            <p><strong>Solde du contrat :</strong> {contractData.balance} ETH</p>
            {error && <p className="error">Erreur : {error}</p>}
            <button onClick={confirmShipment}>Confirmer l'expédition</button>
            <button onClick={() => window.location.href = "/"}>Déconnexion</button>
        </div>
    );
};

export default SellerDashboard;
