const { clusterApiUrl } = require('@solana/web3.js');

module.exports = {
  networks: {
    localnet: {
      url: 'http://127.0.0.1:8899',
      commitment: 'confirmed'
    },
    devnet: {
      url: clusterApiUrl('devnet'),
      commitment: 'confirmed'
    },
    testnet: {
      url: clusterApiUrl('testnet'),
      commitment: 'confirmed'
    },
    mainnet: {
      url: clusterApiUrl('mainnet-beta'),
      commitment: 'confirmed'
    }
  }
};
