const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Firebase Admin
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://blockvest-bc812-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Basic health check route
app.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Routes
app.get('/api/user/:uid', authenticateUser, async (req, res) => {
  try {
    const { uid } = req.params;
    const userDoc = await db.collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(userDoc.data());
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/bonds/:address', authenticateUser, async (req, res) => {
  try {
    const { address } = req.params;
    const bondsSnapshot = await db.collection('bonds')
      .where('owner', '==', address)
      .get();

    const bonds = [];
    bondsSnapshot.forEach(doc => {
      bonds.push({ id: doc.id, ...doc.data() });
    });

    res.json({ bonds });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/bonds/purchase', authenticateUser, async (req, res) => {
  try {
    const { name, value, maturityTime, interestRate, owner } = req.body;
    
    const bondRef = await db.collection('bonds').add({
      name,
      value,
      maturityTime,
      interestRate,
      owner,
      purchaseTime: admin.firestore.FieldValue.serverTimestamp(),
      isActive: true
    });

    const userRef = db.collection('users').doc(owner);
    await db.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const userData = userDoc.data();
      const updatedBonds = [...(userData.bonds || []), bondRef.id];
      const updatedTotalInvestment = (userData.totalInvestment || 0) + parseFloat(value);

      transaction.update(userRef, { 
        bonds: updatedBonds,
        totalInvestment: updatedTotalInvestment
      });
    });

    res.json({ 
      success: true, 
      bondId: bondRef.id 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
