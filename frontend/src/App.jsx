import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

const TokenPurchase = () => {
  const [tokenAmount, setTokenAmount] = useState(0);
  const [userAddress, setUserAddress] = useState("");

  const handlePurchase = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/purchase", {
        userAddress,
        tokenAmount,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error purchasing tokens", error);
    }
  };

  return (
    <div className="token-purchase-container">
      <h1>Purchase Tokens</h1>
      <input
        type="text"
        placeholder="Your Wallet Address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Number of Tokens"
        value={tokenAmount}
        onChange={(e) => setTokenAmount(Number(e.target.value))}
      />
      <button onClick={handlePurchase}>Buy</button>
    </div>
  );
};

export default TokenPurchase;
