const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Connection, clusterApiUrl, PublicKey, Keypair } = require('@solana/web3.js');
const { createClient } = require('@supabase/supabase-js');
const BondContract = require('./contracts/BondContract');
const config = require('./config/config');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Supabase setup
const supabase = createClient(
  config.supabase.url,
  config.supabase.serviceKey
);

// Solana setup
const connection = new Connection(config.solana.network, 'confirmed');
const bondContract = new BondContract(connection, config.solana.programId);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Bond Management Endpoints
app.post('/api/bonds', async (req, res) => {
  const { name, issuer, maturityDate, interestRate, totalSupply, price } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('bonds')
      .insert([{
        name,
        issuer,
        maturity_date: maturityDate,
        interest_rate: interestRate,
        total_supply: totalSupply,
        available_supply: totalSupply,
        price
      }])
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    console.error('Error creating bond:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/bonds', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bonds')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching bonds:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/bonds/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bonds')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Bond not found' });
    }
    res.json(data);
  } catch (error) {
    console.error('Error fetching bond:', error);
    res.status(500).json({ error: error.message });
  }
});

// Investment Endpoints
app.post('/api/invest', async (req, res) => {
  const { bondId, amount, userPublicKey } = req.body;

  try {
    // Check bond availability
    const { data: bond, error: bondError } = await supabase
      .from('bonds')
      .select('*')
      .eq('id', bondId)
      .single();

    if (bondError) throw bondError;
    if (!bond) {
      return res.status(404).json({ error: 'Bond not found' });
    }
    if (bond.available_supply < amount) {
      return res.status(400).json({ error: 'Insufficient bond supply' });
    }

    // Create a new Keypair for the transaction
    const payerAccount = Keypair.generate();

    // Execute Solana transaction
    const signature = await bondContract.invest(
      bondId,
      amount,
      payerAccount
    );

    // Record investment in database
    const { error: investError } = await supabase
      .from('investments')
      .insert([{
        user_address: userPublicKey,
        bond_id: bondId,
        amount,
        transaction_hash: signature
      }]);

    if (investError) throw investError;

    // Update bond supply
    const { error: updateError } = await supabase
      .from('bonds')
      .update({ available_supply: bond.available_supply - amount })
      .eq('id', bondId);

    if (updateError) throw updateError;

    res.json({
      success: true,
      signature,
      investment: {
        bondId,
        amount,
        userPublicKey,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error processing investment:', error);
    res.status(500).json({ error: error.message });
  }
});

// Portfolio Endpoints
app.get('/api/portfolio/:address', async (req, res) => {
  try {
    // Get investments from database
    const { data: investments, error: investError } = await supabase
      .from('investments')
      .select(`
        *,
        bonds (*)
      `)
      .eq('user_address', req.params.address);

    if (investError) throw investError;

    // Get Solana balance
    const balance = await bondContract.getBalance(req.params.address);

    // Calculate portfolio statistics
    const totalInvested = investments.reduce((sum, inv) => sum + (inv.amount * inv.bonds.price), 0);
    const totalBonds = investments.reduce((sum, inv) => sum + inv.amount, 0);

    res.json({
      investments,
      statistics: {
        totalInvested,
        totalBonds,
        solanaBalance: balance
      }
    });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: error.message });
  }
});

// Market Statistics Endpoint
app.get('/api/market/stats', async (req, res) => {
  try {
    const { data: bonds, error: bondsError } = await supabase
      .from('bonds')
      .select('*');

    if (bondsError) throw bondsError;

    const { data: investments, error: investError } = await supabase
      .from('investments')
      .select('amount, bonds(price)');

    if (investError) throw investError;

    const totalBonds = bonds.length;
    const totalSupply = bonds.reduce((sum, bond) => sum + bond.total_supply, 0);
    const totalInvested = investments.reduce((sum, inv) => sum + (inv.amount * inv.bonds.price), 0);
    const averageInterestRate = bonds.reduce((sum, bond) => sum + bond.interest_rate, 0) / totalBonds;

    res.json({
      totalBonds,
      totalSupply,
      totalInvested,
      averageInterestRate,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching market stats:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = config.port || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Solana connection: ${connection.rpcEndpoint}`);
});
