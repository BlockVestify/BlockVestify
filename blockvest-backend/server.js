const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const supabase = require('../database/supabaseConfig');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Basic health check route
app.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Routes
app.get('/api/user/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    // Removed db.collection('users').doc(uid).get() as it was using Firebase Admin SDK
    res.json({ message: 'User not found' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/bonds/:address', async (req, res) => {
  try {
    const { address } = req.params;
    // Removed db.collection('bonds').where('owner', '==', address).get() as it was using Firebase Admin SDK
    res.json({ bonds: [] });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/bonds/purchase', async (req, res) => {
  try {
    const { name, value, maturityTime, interestRate, owner } = req.body;
    // Removed db.collection('bonds').add() and db.runTransaction() as they were using Firebase Admin SDK
    res.json({ success: false, message: 'Failed to purchase bond' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
