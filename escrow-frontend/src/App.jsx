import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import BuyerDashboard from "./pages/BuyerDashboard.jsx";
import SellerDashboard from "./pages/SellerDashboard.jsx";
import "./styles/styles.css";

// Adresse de ton contrat déployé (remplace par la bonne adresse)
const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

// ABI du contrat (ajoute ici ton ABI complet)
const contractABI = [
  "function buyer() public view returns (address)",
  "function seller() public view returns (address)",
  "function isShipped() public view returns (bool)",
  "function confirmShipment() public",
  "function releaseFunds() public",
  "function getBalance() public view returns (uint)"
];

const App = () => {
  console.log("📜 Adresse du contrat définie dans App.jsx :", contractAddress);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/buyer" element={<BuyerDashboard contractAddress={contractAddress} contractABI={contractABI} />} />
      <Route path="/seller" element={<SellerDashboard contractAddress={contractAddress} contractABI={contractABI} />} />
    </Routes>
  );
};

export default App;
