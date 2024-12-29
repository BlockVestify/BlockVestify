const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function initializeDatabase() {
  try {
    // Create bonds table
    const { error: bondsError } = await supabase.rpc('create_bonds_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS bonds (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          issuer TEXT NOT NULL,
          maturity_date TIMESTAMP NOT NULL,
          interest_rate NUMERIC NOT NULL,
          total_supply NUMERIC NOT NULL,
          available_supply NUMERIC NOT NULL,
          price NUMERIC NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    if (bondsError) throw bondsError;

    // Create investments table
    const { error: investmentsError } = await supabase.rpc('create_investments_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS investments (
          id SERIAL PRIMARY KEY,
          user_address TEXT NOT NULL,
          bond_id INTEGER REFERENCES bonds(id),
          amount NUMERIC NOT NULL,
          transaction_hash TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    if (investmentsError) throw investmentsError;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Run initialization
initializeDatabase();
