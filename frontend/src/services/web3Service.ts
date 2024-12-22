import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import BondContractABI from '../contracts/BondContract.json';

const BOND_CONTRACT_ADDRESS = '0x2c6A63A650D935Bc066b5313d24B9132758A3B2a';
const web3 = new Web3('http://127.0.0.1:7545');

export interface Bond {
    id: string;
    name: string;
    value: number;
    purchaseTime: number;
    maturityTime: number;
    interestRate: number;
    owner: string;
    isActive: boolean;
    currentValue?: number;
}

class Web3Service {
    private contract: Contract<typeof BondContractABI>;

    constructor() {
        try {
            this.contract = new web3.eth.Contract(
                BondContractABI as AbiItem[],
                BOND_CONTRACT_ADDRESS
            );
        } catch (error) {
            console.error('Failed to initialize Web3Service:', error);
            throw new Error('Failed to connect to blockchain network');
        }
    }

    async getAccounts(): Promise<string[]> {
        try {
            return await web3.eth.getAccounts();
        } catch (error) {
            console.error('Error getting accounts:', error);
            throw new Error('Failed to get blockchain accounts');
        }
    }

    async purchaseBond(
        name: string,
        value: number,
        maturityTime: number,
        interestRate: number,
        from: string
    ): Promise<string> {
        try {
            // Validate the address format
            if (!Web3.utils.isAddress(from)) {
                throw new Error('Invalid Ethereum address format');
            }

            const result = await this.contract.methods
                .purchaseBond(name, value, maturityTime, interestRate)
                .send({ from, value: Web3.utils.toWei(value.toString(), 'ether') });
            
            return result.events.BondPurchased.returnValues.bondId;
        } catch (error) {
            console.error('Error purchasing bond:', error);
            throw error;
        }
    }

    async sellBond(bondId: string, from: string): Promise<void> {
        try {
            await this.contract.methods
                .sellBond(bondId)
                .send({ from, gas: 500000 });
        } catch (error: any) {
            console.error('Error selling bond:', error);
            throw new Error(error.message || 'Failed to sell bond');
        }
    }

    async getUserBonds(address: string): Promise<Bond[]> {
        try {
            // Validate the address format
            if (!Web3.utils.isAddress(address)) {
                throw new Error('Invalid Ethereum address format');
            }

            const bondIds = await this.contract.methods.getBondsByOwner(address).call();
            const bonds = await Promise.all(
                bondIds.map(async (id: string) => this.getBondDetails(id))
            );
            return bonds;
        } catch (error) {
            console.error('Error fetching user bonds:', error);
            throw error;
        }
    }

    async getBondDetails(bondId: string): Promise<Bond> {
        try {
            const bond = await this.contract.methods
                .getBondDetails(bondId)
                .call();

            return {
                id: bondId,
                name: bond.name,
                value: Number(web3.utils.fromWei(bond.value, 'ether')),
                purchaseTime: parseInt(bond.purchaseTime),
                maturityTime: parseInt(bond.maturityTime),
                interestRate: parseInt(bond.interestRate),
                owner: bond.owner,
                isActive: bond.isActive
            };
        } catch (error: any) {
            console.error('Error getting bond details:', error);
            throw new Error(error.message || 'Failed to get bond details');
        }
    }

    async calculateCurrentValue(bondId: string): Promise<number> {
        try {
            const value = await this.contract.methods
                .calculateCurrentValue(bondId)
                .call();
            return parseFloat(web3.utils.fromWei(value, 'ether'));
        } catch (error: any) {
            console.error('Error calculating current value:', error);
            throw new Error(error.message || 'Failed to calculate bond value');
        }
    }

    generateRandomBonds(count: number): Bond[] {
        const bondTypes = ['Government', 'Corporate'];
        const companies = ['Tesla', 'Apple', 'Microsoft', 'Amazon', 'Google'];
        const countries = ['US', 'UK', 'Germany', 'Japan', 'Canada'];
        
        return Array.from({ length: count }, (_, i) => {
            const isCorporate = Math.random() > 0.5;
            const value = Math.floor(Math.random() * 81) + 20; // 20 to 100
            const interestRate = Math.floor(Math.random() * 10) + 5; // 5% to 15%
            const maturityMonths = Math.floor(Math.random() * 60) + 12; // 1 to 5 years
            
            const name = isCorporate
                ? `${companies[Math.floor(Math.random() * companies.length)]} Corporate Bond`
                : `${countries[Math.floor(Math.random() * countries.length)]} Government Bond`;
            
            return {
                id: `suggested-${i}`,
                name,
                value,
                purchaseTime: 0,
                maturityTime: Date.now() + (maturityMonths * 30 * 24 * 60 * 60 * 1000),
                interestRate,
                owner: '',
                isActive: true,
                currentValue: value
            };
        });
    }
}

export const web3Service = new Web3Service();
