require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const sampleBonds = [
  {
    name: 'US Treasury Bond 2025',
    issuer: 'US Treasury',
    maturity_date: '2025-12-31T00:00:00Z',
    interest_rate: 3.5,
    total_supply: 1000000,
    available_supply: 1000000,
    price: 1000
  },
  {
    name: 'Corporate Bond A 2024',
    issuer: 'Tech Corp',
    maturity_date: '2024-06-30T00:00:00Z',
    interest_rate: 4.2,
    total_supply: 500000,
    available_supply: 500000,
    price: 950
  },
  {
    name: 'Green Energy Bond 2026',
    issuer: 'Renewable Energy Co',
    maturity_date: '2026-12-31T00:00:00Z',
    interest_rate: 5.0,
    total_supply: 750000,
    available_supply: 750000,
    price: 1100
  }
];

async function seedData() {
  try {
    console.log('Seeding sample bonds...');

    const { data, error } = await supabase
      .from('bonds')
      .insert(sampleBonds)
      .select();

    if (error) {
      console.error('Error seeding bonds:', error);
      return;
    }

    console.log('Sample bonds created:', data);
    console.log('Data seeding completed successfully!');

  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// Run the seeding
seedData()
  .then(() => {
    console.log('Data seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Data seeding failed:', error);
    process.exit(1);
  });
