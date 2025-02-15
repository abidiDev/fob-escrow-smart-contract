import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import EscrowABI from "../../../../artifacts/contracts/EscrowFOB.sol/EscrowFOB.json";

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const contractABI = EscrowABI.abi;

const BuyerDashboard = () => {
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

    const releaseFunds = async () => {
        if (!window.ethereum) {
            setError("MetaMask n'est pas installé.");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            if (account.toLowerCase() !== contractData.buyer.toLowerCase()) {
                throw new Error("Seul l'acheteur peut libérer les fonds.");
            }

            const tx = await contract.releaseFunds();
            await tx.wait();
            alert("Fonds libérés avec succès !");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Tableau de bord Acheteur</h2>
            <p><strong>Compte :</strong> {account}</p>
            <p><strong>Expédition confirmée :</strong> {contractData.isShipped ? "Oui ✅" : "Non ❌"}</p>
            <p><strong>Solde du contrat :</strong> {contractData.balance} ETH</p>
            {error && <p className="error">Erreur : {error}</p>}
            <button onClick={releaseFunds}>Libérer les fonds</button>
            <button onClick={() => window.location.href = "/"}>Déconnexion</button>
        </div>
    );
};

export default BuyerDashboard;
