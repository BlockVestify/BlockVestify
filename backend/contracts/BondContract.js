const { Connection, PublicKey, Keypair, Transaction } = require('@solana/web3.js');
const { Token, TOKEN_PROGRAM_ID } = require('@solana/spl-token');

class BondContract {
  constructor(connection, programId) {
    this.connection = connection;
    this.programId = new PublicKey(programId);
  }

  async invest(bondId, amount, payerAccount) {
    try {
      // Create transaction
      const transaction = new Transaction();
      
      // Add your program instruction here
      // This will depend on your specific Solana program structure
      
      // Sign and send transaction
      const signature = await this.connection.sendTransaction(
        transaction,
        [payerAccount],
        { preflightCommitment: 'confirmed' }
      );

      return signature;
    } catch (error) {
      throw error;
    }
  }

  async getBalance(address) {
    try {
      const publicKey = new PublicKey(address);
      const balance = await this.connection.getBalance(publicKey);
      return balance;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BondContract;
