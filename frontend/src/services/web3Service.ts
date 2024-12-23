import Web3 from 'web3';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import BondContractABI from '../contracts/BondContract.json';

// Connect to local Ganache instance
const GANACHE_URL = 'http://127.0.0.1:8545';
const BOND_CONTRACT_ADDRESS = '0xF555ca6EFd99aA8b36C580B883C83b2b34206Ab3';

// Initialize Web3
let web3: Web3;
if ((window as any).ethereum) {
    web3 = new Web3((window as any).ethereum);
    try {
        // Request account access
        (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
        console.error("User denied account access");
    }
} else {
    web3 = new Web3(new Web3.providers.HttpProvider(GANACHE_URL));
}

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
    blockchainId?: string;
}

class Web3Service {
    private contract: any;

    constructor() {
        try {
            this.contract = new web3.eth.Contract(
                BondContractABI.abi,
                BOND_CONTRACT_ADDRESS
            );
        } catch (error) {
            console.error('Failed to initialize Web3Service:', error);
        }
    }

    private async getSignerAddress(): Promise<string> {
        try {
            const accounts = await web3.eth.getAccounts();
            if (!accounts || accounts.length === 0) {
                throw new Error('No accounts found. Please connect your wallet.');
            }
            return accounts[0];
        } catch (error) {
            console.error('Error getting signer:', error);
            throw new Error('Failed to get signer. Please make sure your wallet is connected.');
        }
    }

    async getUserBonds(userId: string): Promise<Bond[]> {
        try {
            // Get bonds from Firebase
            const bondsRef = collection(db, 'bonds');
            const q = query(bondsRef, where('owner', '==', userId));
            const querySnapshot = await getDocs(q);
            
            const bonds: Bond[] = [];
            querySnapshot.forEach((doc) => {
                bonds.push({ id: doc.id, ...doc.data() } as Bond);
            });

            // If web3 is available, get additional blockchain data
            if (this.contract) {
                for (let bond of bonds) {
                    if (bond.blockchainId) {
                        try {
                            const blockchainData = await this.contract.methods
                                .getBond(bond.blockchainId)
                                .call();
                            bond.currentValue = Number(web3.utils.fromWei(blockchainData.currentValue, 'ether'));
                        } catch (error) {
                            console.error('Error getting blockchain data for bond:', error);
                        }
                    }
                }
            }
            
            return bonds;
        } catch (error) {
            console.error('Error getting user bonds:', error);
            throw new Error('Failed to get user bonds');
        }
    }

    async purchaseBond(
        name: string,
        value: number,
        maturityTime: number,
        interestRate: number,
        owner: string
    ): Promise<string> {
        try {
            const signerAddress = await this.getSignerAddress();
            
            const bond = {
                name,
                value,
                purchaseTime: Date.now(),
                maturityTime,
                interestRate,
                owner,
                isActive: true,
                currentValue: value
            };

            // Store in Firebase first
            const docRef = await addDoc(collection(db, 'bonds'), bond);

            // If web3 is available, also store in blockchain
            if (this.contract) {
                try {
                    const valueInWei = web3.utils.toWei(value.toString(), 'ether');
                    const result = await this.contract.methods
                        .purchaseBond(name, valueInWei, maturityTime, interestRate)
                        .send({ 
                            from: signerAddress, 
                            value: valueInWei,
                            gas: 500000
                        });
                    
                    // Update Firebase document with blockchain ID
                    await updateDoc(doc(db, 'bonds', docRef.id), {
                        blockchainId: result.events.BondPurchased.returnValues.bondId
                    });
                } catch (error: any) {
                    console.error('Error creating bond on blockchain:', error);
                    if (error.message.includes('User denied transaction')) {
                        throw new Error('Transaction was rejected. Please approve the transaction in your wallet.');
                    }
                }
            }

            return docRef.id;
        } catch (error: any) {
            console.error('Error purchasing bond:', error);
            throw new Error(error.message || 'Failed to purchase bond');
        }
    }

    async sellBond(bondId: string): Promise<void> {
        try {
            const signerAddress = await this.getSignerAddress();
            
            const bondRef = doc(db, 'bonds', bondId);
            const bondData = (await getDocs(query(collection(db, 'bonds'), where('id', '==', bondId)))).docs[0];
            
            if (!bondData) {
                throw new Error('Bond not found');
            }

            const bond = { id: bondData.id, ...bondData.data() } as Bond;

            // Update Firebase
            await updateDoc(bondRef, { isActive: false });

            // If web3 is available and bond has blockchain ID, update blockchain
            if (this.contract && bond.blockchainId) {
                try {
                    await this.contract.methods
                        .sellBond(bond.blockchainId)
                        .send({ 
                            from: signerAddress,
                            gas: 500000
                        });
                } catch (error: any) {
                    console.error('Error selling bond on blockchain:', error);
                    if (error.message.includes('User denied transaction')) {
                        throw new Error('Transaction was rejected. Please approve the transaction in your wallet.');
                    }
                    throw error;
                }
            }
        } catch (error: any) {
            console.error('Error selling bond:', error);
            throw new Error(error.message || 'Failed to sell bond');
        }
    }

    calculateCurrentValue(bond: Bond): number {
        if (this.contract && bond.blockchainId) {
            return bond.currentValue || bond.value;
        }

        const now = Date.now();
        const timeElapsed = now - bond.purchaseTime;
        const totalTime = bond.maturityTime - bond.purchaseTime;
        const progress = Math.min(timeElapsed / totalTime, 1);
        
        // Simple interest calculation
        const interest = bond.value * (bond.interestRate / 100) * progress;
        return bond.value + interest;
    }

    async getAccounts(): Promise<string[]> {
        try {
            return await this.getSignerAddress().then(address => [address]);
        } catch (error) {
            console.error('Error getting accounts:', error);
            throw new Error('Failed to get blockchain accounts. Please connect your wallet.');
        }
    }
}

export const web3Service = new Web3Service();
