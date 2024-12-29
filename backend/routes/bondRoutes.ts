import express from 'express';
import { Keypair } from '@solana/web3.js';
import { BondService } from '../services/bondService';
import { authenticateUser } from '../middleware/auth';

const router = express.Router();
const bondService = new BondService();

// Create a new bond
router.post('/bonds', authenticateUser, async (req, res) => {
  try {
    const { amount, maturityDate, interestRate, bondType, privateKey } = req.body;
    
    // Create keypair from private key
    const issuerKeypair = Keypair.fromSecretKey(
      Buffer.from(privateKey, 'base64')
    );

    const bond = await bondService.createBond(
      issuerKeypair,
      amount,
      maturityDate,
      interestRate,
      bondType
    );

    res.json(bond);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Invest in a bond
router.post('/bonds/:bondId/invest', authenticateUser, async (req, res) => {
  try {
    const { amount, privateKey } = req.body;
    const { bondId } = req.params;

    const investorKeypair = Keypair.fromSecretKey(
      Buffer.from(privateKey, 'base64')
    );

    const investment = await bondService.investInBond(
      investorKeypair,
      bondId,
      amount
    );

    res.json(investment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Redeem a bond
router.post('/bonds/:bondId/redeem', authenticateUser, async (req, res) => {
  try {
    const { privateKey } = req.body;
    const { bondId } = req.params;

    const investorKeypair = Keypair.fromSecretKey(
      Buffer.from(privateKey, 'base64')
    );

    const result = await bondService.redeemBond(investorKeypair, bondId);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all active bonds
router.get('/bonds', authenticateUser, async (req, res) => {
  try {
    const bonds = await bondService.getBonds();
    res.json(bonds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bonds by investor
router.get('/bonds/investor/:address', authenticateUser, async (req, res) => {
  try {
    const { address } = req.params;
    const bonds = await bondService.getBondsByInvestor(address);
    res.json(bonds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bonds by issuer
router.get('/bonds/issuer/:address', authenticateUser, async (req, res) => {
  try {
    const { address } = req.params;
    const bonds = await bondService.getBondsByIssuer(address);
    res.json(bonds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
