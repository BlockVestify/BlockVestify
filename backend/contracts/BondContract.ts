import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  Connection,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';

export class BondContract {
  private connection: Connection;
  private programId: PublicKey;

  constructor(connection: Connection, programId: string) {
    this.connection = connection;
    this.programId = new PublicKey(programId);
  }

  async createBond(
    issuer: Keypair,
    amount: number,
    maturityDate: number,
    interestRate: number,
    bondType: string
  ) {
    const bondAccount = Keypair.generate();
    const createBondIx = SystemProgram.createAccount({
      fromPubkey: issuer.publicKey,
      newAccountPubkey: bondAccount.publicKey,
      lamports: await this.connection.getMinimumBalanceForRentExemption(1024),
      space: 1024,
      programId: this.programId,
    });

    const initBondIx = new TransactionInstruction({
      keys: [
        { pubkey: issuer.publicKey, isSigner: true, isWritable: true },
        { pubkey: bondAccount.publicKey, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      programId: this.programId,
      data: Buffer.from([
        0, // Instruction index for create bond
        ...new Uint8Array(new Float64Array([amount]).buffer),
        ...new Uint8Array(new Float64Array([maturityDate]).buffer),
        ...new Uint8Array(new Float64Array([interestRate]).buffer),
        ...Buffer.from(bondType),
      ]),
    });

    const transaction = new Transaction().add(createBondIx, initBondIx);
    
    try {
      const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [issuer, bondAccount]
      );
      return {
        bondAddress: bondAccount.publicKey.toString(),
        signature,
      };
    } catch (error) {
      throw new Error(`Failed to create bond: ${error}`);
    }
  }

  async investInBond(
    investor: Keypair,
    bondAddress: string,
    investmentAmount: number
  ) {
    const bondPubkey = new PublicKey(bondAddress);
    const investIx = new TransactionInstruction({
      keys: [
        { pubkey: investor.publicKey, isSigner: true, isWritable: true },
        { pubkey: bondPubkey, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      programId: this.programId,
      data: Buffer.from([
        1, // Instruction index for invest
        ...new Uint8Array(new Float64Array([investmentAmount]).buffer),
      ]),
    });

    const transaction = new Transaction().add(investIx);
    
    try {
      const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [investor]
      );
      return {
        signature,
      };
    } catch (error) {
      throw new Error(`Failed to invest in bond: ${error}`);
    }
  }

  async redeemBond(investor: Keypair, bondAddress: string) {
    const bondPubkey = new PublicKey(bondAddress);
    const redeemIx = new TransactionInstruction({
      keys: [
        { pubkey: investor.publicKey, isSigner: true, isWritable: true },
        { pubkey: bondPubkey, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      programId: this.programId,
      data: Buffer.from([2]), // Instruction index for redeem
    });

    const transaction = new Transaction().add(redeemIx);
    
    try {
      const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [investor]
      );
      return {
        signature,
      };
    } catch (error) {
      throw new Error(`Failed to redeem bond: ${error}`);
    }
  }

  async getBondInfo(bondAddress: string) {
    try {
      const accountInfo = await this.connection.getAccountInfo(
        new PublicKey(bondAddress)
      );
      if (!accountInfo) {
        throw new Error('Bond account not found');
      }
      // Parse the account data based on your program's data structure
      return this.parseBondData(accountInfo.data);
    } catch (error) {
      throw new Error(`Failed to get bond info: ${error}`);
    }
  }

  private parseBondData(data: Buffer) {
    // Implement parsing logic based on your program's data structure
    return {
      amount: new Float64Array(data.slice(0, 8))[0],
      maturityDate: new Float64Array(data.slice(8, 16))[0],
      interestRate: new Float64Array(data.slice(16, 24))[0],
      bondType: data.slice(24, 44).toString().replace(/\0/g, ''),
    };
  }
}
