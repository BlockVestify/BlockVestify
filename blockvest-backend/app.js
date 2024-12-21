const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Web3 = require('web3');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to Ganache
let provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
let web3 = new Web3(provider);

// Load the contract ABI and address
const contractABI = [
    // Replace with your contract ABI here
];
const contractAddress = '0x28627fE51668563d015324da375DFEF7D939d138'; // Replace with your deployed contract address

const assetTokenContract = new web3.eth.Contract(contractABI, contractAddress);

app.post('/invest', async (req, res) => {
    const { amount, token } = req.body;
    const accounts = await web3.eth.getAccounts();
    try {
        const result = await assetTokenContract.methods.invest(amount, token).send({
            from: accounts[0],
            gas: 1500000,
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/balance/:address', async (req, res) => {
    const address = req.params.address;
    try {
        const result = await assetTokenContract.methods.balanceOf(address).call();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
