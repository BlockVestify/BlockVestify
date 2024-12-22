import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import BondContractArtifact from '../../../build/contracts/BondContract.json';

class BondService {
    private web3: Web3;
    private contract: any;
    private contractAddress: string = '0x950F2Ed0248F3Fd121bee2De734616F9b9D18960';

    constructor() {
        this.web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
        this.contract = new this.web3.eth.Contract(
            BondContractArtifact.abi as AbiItem[],
            this.contractAddress
        );
    }

    async connectWallet(): Promise<string[]> {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                return accounts;
            } catch (error) {
                throw new Error('User denied account access');
            }
        }
        throw new Error('No Ethereum wallet found');
    }

    async purchaseBond(name: string, value: number, maturityTime: number, interestRate: number): Promise<any> {
        const accounts = await this.web3.eth.getAccounts();
        return this.contract.methods.purchaseBond(name, value, maturityTime, interestRate)
            .send({
                from: accounts[0],
                value: this.web3.utils.toWei(value.toString(), 'ether')
            });
    }

    async sellBond(bondId: number): Promise<any> {
        const accounts = await this.web3.eth.getAccounts();
        return this.contract.methods.sellBond(bondId)
            .send({ from: accounts[0] });
    }

    async getUserBonds(address: string): Promise<number[]> {
        return this.contract.methods.getUserBonds(address).call();
    }

    async getBondDetails(bondId: number): Promise<any> {
        return this.contract.methods.getBondDetails(bondId).call();
    }

    async calculateCurrentValue(bondId: number): Promise<string> {
        const value = await this.contract.methods.calculateCurrentValue(bondId).call();
        return this.web3.utils.fromWei(value, 'ether');
    }
}

export const bondService = new BondService();
