import React, { useState, useEffect } from 'react';
import { bondService } from '../services/bondService';
import { toast } from 'react-toastify';

interface Bond {
    id: number;
    name: string;
    value: string;
    purchaseTime: string;
    maturityTime: string;
    interestRate: string;
    owner: string;
    isActive: boolean;
}

export const BondManager: React.FC = () => {
    const [account, setAccount] = useState<string>('');
    const [bonds, setBonds] = useState<Bond[]>([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        value: '',
        maturityDays: '',
        interestRate: ''
    });

    useEffect(() => {
        connectWallet();
    }, []);

    const connectWallet = async () => {
        try {
            const accounts = await bondService.connectWallet();
            setAccount(accounts[0]);
            loadUserBonds(accounts[0]);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const loadUserBonds = async (address: string) => {
        try {
            setLoading(true);
            const bondIds = await bondService.getUserBonds(address);
            const bondDetails = await Promise.all(
                bondIds.map(id => bondService.getBondDetails(Number(id)))
            );
            setBonds(bondDetails);
        } catch (error: any) {
            toast.error('Error loading bonds');
        } finally {
            setLoading(false);
        }
    };

    const handlePurchaseBond = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const maturityTime = Math.floor(Date.now() / 1000) + (Number(formData.maturityDays) * 86400);
            await bondService.purchaseBond(
                formData.name,
                Number(formData.value),
                maturityTime,
                Number(formData.interestRate)
            );
            toast.success('Bond purchased successfully!');
            loadUserBonds(account);
            setFormData({ name: '', value: '', maturityDays: '', interestRate: '' });
        } catch (error: any) {
            toast.error('Error purchasing bond');
        } finally {
            setLoading(false);
        }
    };

    const handleSellBond = async (bondId: number) => {
        try {
            setLoading(true);
            await bondService.sellBond(bondId);
            toast.success('Bond sold successfully!');
            loadUserBonds(account);
        } catch (error: any) {
            toast.error('Error selling bond');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Bond Manager</h1>
            
            {!account ? (
                <button
                    onClick={connectWallet}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Connect Wallet
                </button>
            ) : (
                <div>
                    <p className="mb-4">Connected Account: {account}</p>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold mb-4">Purchase New Bond</h2>
                        <form onSubmit={handlePurchaseBond}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2">Bond Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Value (ETH)</label>
                                    <input
                                        type="number"
                                        name="value"
                                        value={formData.value}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Maturity (Days)</label>
                                    <input
                                        type="number"
                                        name="maturityDays"
                                        value={formData.maturityDays}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Interest Rate (%)</label>
                                    <input
                                        type="number"
                                        name="interestRate"
                                        value={formData.interestRate}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-4 bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                            >
                                {loading ? 'Processing...' : 'Purchase Bond'}
                            </button>
                        </form>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Your Bonds</h2>
                        {loading ? (
                            <p>Loading bonds...</p>
                        ) : bonds.length === 0 ? (
                            <p>No bonds found</p>
                        ) : (
                            <div className="grid gap-4">
                                {bonds.map((bond) => (
                                    <div key={bond.id} className="border p-4 rounded">
                                        <h3 className="font-semibold">{bond.name}</h3>
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                            <p>Value: {bond.value} ETH</p>
                                            <p>Interest Rate: {bond.interestRate}%</p>
                                            <p>Purchase Time: {new Date(Number(bond.purchaseTime) * 1000).toLocaleDateString()}</p>
                                            <p>Maturity Time: {new Date(Number(bond.maturityTime) * 1000).toLocaleDateString()}</p>
                                        </div>
                                        {bond.isActive && (
                                            <button
                                                onClick={() => handleSellBond(bond.id)}
                                                disabled={loading}
                                                className="mt-2 bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                                            >
                                                Sell Bond
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
