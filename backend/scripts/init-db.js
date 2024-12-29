require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function createTables() {
  try {
    console.log('Creating tables in Supabase...');

    // Create bonds table
    const { error: bondsError } = await supabase.rpc('exec_sql', {
      query: `
        CREATE TABLE IF NOT EXISTS bonds (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          name TEXT NOT NULL,
          issuer TEXT NOT NULL,
          maturity_date TIMESTAMP WITH TIME ZONE NOT NULL,
          interest_rate DECIMAL NOT NULL,
          total_supply DECIMAL NOT NULL,
          available_supply DECIMAL NOT NULL,
          price DECIMAL NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    if (bondsError) {
      console.error('Error creating bonds table:', bondsError);
      return;
    }

    // Create investments table
    const { error: investmentsError } = await supabase.rpc('exec_sql', {
      query: `
        CREATE TABLE IF NOT EXISTS investments (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          user_address TEXT NOT NULL,
          bond_id BIGINT REFERENCES bonds(id),
          amount DECIMAL NOT NULL,
          transaction_hash TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    if (investmentsError) {
      console.error('Error creating investments table:', investmentsError);
      return;
    }

    console.log('Tables created successfully!');

  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Run the initialization
createTables()
  .then(() => {
    console.log('Database initialization completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database initialization failed:', error);
    process.exit(1);
  });
