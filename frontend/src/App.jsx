<<<<<<< HEAD
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Invest from './Invest';
=======
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
>>>>>>> 1986f874b138ed3b5e89bac24f894a60a87a7402

function App() {
  return (
<<<<<<< HEAD
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/invest" component={Invest} />
        </Switch>
      </div>
    </Router>
=======
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
>>>>>>> 1986f874b138ed3b5e89bac24f894a60a87a7402
  );
}

export default App;
