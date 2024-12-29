import { Connection, Keypair } from '@solana/web3.js';
import { createClient } from '@supabase/supabase-js';
import { BondContract } from '../contracts/BondContract';
import config from '../config/config';

export class BondService {
  private supabase;
  private bondContract: BondContract;
  private connection: Connection;

  constructor() {
    this.supabase = createClient(config.supabase.url, config.supabase.serviceKey);
    this.connection = new Connection(config.solana.network, 'confirmed');
    this.bondContract = new BondContract(this.connection, config.solana.programId);
  }

  async createBond(
    issuerKeypair: Keypair,
    amount: number,
    maturityDate: number,
    interestRate: number,
    bondType: string
  ) {
    try {
      // Create bond on blockchain
      const { bondAddress, signature } = await this.bondContract.createBond(
        issuerKeypair,
        amount,
        maturityDate,
        interestRate,
        bondType
      );

      // Store bond in database
      const { data, error } = await this.supabase
        .from('bonds')
        .insert({
          bond_address: bondAddress,
          issuer_address: issuerKeypair.publicKey.toString(),
          amount,
          maturity_date: new Date(maturityDate),
          interest_rate: interestRate,
          bond_type: bondType,
          status: 'active'
        })
        .single();

      if (error) throw error;

      return {
        ...data,
        signature
      };
    } catch (error) {
      throw new Error(`Failed to create bond: ${error}`);
    }
  }

  async investInBond(
    investorKeypair: Keypair,
    bondId: string,
    amount: number
  ) {
    try {
      // Get bond from database
      const { data: bond, error: bondError } = await this.supabase
        .from('bonds')
        .select('*')
        .eq('id', bondId)
        .single();

      if (bondError) throw bondError;
      if (!bond) throw new Error('Bond not found');

      // Invest in bond on blockchain
      const { signature } = await this.bondContract.investInBond(
        investorKeypair,
        bond.bond_address,
        amount
      );

      // Store investment in database
      const { data, error } = await this.supabase
        .from('investments')
        .insert({
          bond_id: bondId,
          investor_address: investorKeypair.publicKey.toString(),
          amount,
          transaction_signature: signature,
          status: 'active'
        })
        .single();

      if (error) throw error;

      return {
        ...data,
        signature
      };
    } catch (error) {
      throw new Error(`Failed to invest in bond: ${error}`);
    }
  }

  async redeemBond(
    investorKeypair: Keypair,
    bondId: string
  ) {
    try {
      // Get bond and investment from database
      const { data: bond, error: bondError } = await this.supabase
        .from('bonds')
        .select('*')
        .eq('id', bondId)
        .single();

      if (bondError) throw bondError;
      if (!bond) throw new Error('Bond not found');

      const { data: investment, error: investmentError } = await this.supabase
        .from('investments')
        .select('*')
        .eq('bond_id', bondId)
        .eq('investor_address', investorKeypair.publicKey.toString())
        .single();

      if (investmentError) throw investmentError;
      if (!investment) throw new Error('Investment not found');

      // Redeem bond on blockchain
      const { signature } = await this.bondContract.redeemBond(
        investorKeypair,
        bond.bond_address
      );

      // Update investment status in database
      const { error } = await this.supabase
        .from('investments')
        .update({ status: 'redeemed' })
        .eq('id', investment.id);

      if (error) throw error;

      return { signature };
    } catch (error) {
      throw new Error(`Failed to redeem bond: ${error}`);
    }
  }

  async getBonds(status = 'active') {
    try {
      const { data, error } = await this.supabase
        .from('bonds')
        .select(`
          *,
          investments (
            amount,
            investor_address,
            status
          )
        `)
        .eq('status', status);

      if (error) throw error;

      return data;
    } catch (error) {
      throw new Error(`Failed to get bonds: ${error}`);
    }
  }

  async getBondsByInvestor(investorAddress: string) {
    try {
      const { data, error } = await this.supabase
        .from('investments')
        .select(`
          amount,
          status,
          bonds (*)
        `)
        .eq('investor_address', investorAddress);

      if (error) throw error;

      return data;
    } catch (error) {
      throw new Error(`Failed to get investor bonds: ${error}`);
    }
  }

  async getBondsByIssuer(issuerAddress: string) {
    try {
      const { data, error } = await this.supabase
        .from('bonds')
        .select(`
          *,
          investments (
            amount,
            investor_address,
            status
          )
        `)
        .eq('issuer_address', issuerAddress);

      if (error) throw error;

      return data;
    } catch (error) {
      throw new Error(`Failed to get issuer bonds: ${error}`);
    }
  }
}
