const config = {
  supabase: {
    url: process.env.SUPABASE_URL || 'https://qzlhrdrdfisunwxuopor.supabase.co',
    serviceKey: process.env.SUPABASE_SERVICE_KEY
  },
  solana: {
    network: process.env.SOLANA_NETWORK || 'https://api.devnet.solana.com',
    programId: process.env.PROGRAM_ID || '11111111111111111111111111111111' // Replace this with actual program ID after deployment
  },
  port: process.env.PORT || 5000
};

module.exports = config;
