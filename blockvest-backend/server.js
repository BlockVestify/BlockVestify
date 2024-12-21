// Import necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const firebaseAdmin = require('firebase-admin');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import blockchain module
const { initializeBlockchain, createToken, transferToken } = require('./blockchain'); // Hyperledger logic placeholder
const { fetchPrice } = require('./chainlink'); // Chainlink API logic placeholder

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Firebase
const serviceAccount = require('./firebase-service-account.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});
const db = firebaseAdmin.firestore();

// Authentication Middleware
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ error: 'Failed to authenticate token' });
    req.userId = decoded.id;
    next();
  });
};

// Routes

// User Registration
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await firebaseAdmin.auth().createUser({
      email,
      password,
    });

    res.status(201).json({ message: 'User registered successfully', userId: userRecord.uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await firebaseAdmin.auth().getUserByEmail(email);

    // In a real application, validate the password securely
    const token = jwt.sign({ id: user.uid }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Tokenized Asset
app.post('/assets', authenticate, async (req, res) => {
  try {
    const { assetName, assetValue } = req.body;
    const tokenId = await createToken(assetName, assetValue);

    await db.collection('assets').doc(tokenId).set({
      assetName,
      assetValue,
      ownerId: req.userId,
    });

    res.status(201).json({ message: 'Asset tokenized successfully', tokenId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch Asset Details
app.get('/assets/:tokenId', authenticate, async (req, res) => {
  try {
    const { tokenId } = req.params;
    const assetDoc = await db.collection('assets').doc(tokenId).get();

    if (!assetDoc.exists) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    res.status(200).json(assetDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Transfer Tokenized Asset
app.post('/transfer', authenticate, async (req, res) => {
  try {
    const { tokenId, recipientId } = req.body;
    await transferToken(tokenId, recipientId);

    res.status(200).json({ message: 'Token transferred successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch Real-Time Price Data
app.get('/price/:asset', async (req, res) => {
  try {
    const { asset } = req.params;
    const price = await fetchPrice(asset);

    res.status(200).json({ asset, price });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
