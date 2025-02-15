import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Bienvenue sur Escrow Smart Contract</h2>
      <p>Choisissez votre rôle :</p>
      <button className="btn" onClick={() => navigate("/buyer")}>Accéder à l'espace Acheteur</button>
      <button className="btn btn-secondary" onClick={() => navigate("/seller")}>Accéder à l'espace Vendeur</button>
    </div>
  );
};

export default Home;
