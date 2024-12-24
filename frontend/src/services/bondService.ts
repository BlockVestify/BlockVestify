// Types
export interface Bond {
  id: number;
  name: string;
  value: number;
  maturityTime: number;
  interestRate: number;
  owner: string;
  isActive: boolean;
}

class BondService {
  private bonds: Bond[] = [
    {
      id: 1,
      name: "Treasury Bond #A123",
      value: 10000,
      maturityTime: 1735686000, // Dec 31, 2024
      interestRate: 3.5,
      owner: "0x123...",
      isActive: true
    },
    {
      id: 2,
      name: "Corporate Bond #B456",
      value: 25000,
      maturityTime: 1751277600, // Dec 31, 2025
      interestRate: 5.2,
      owner: "0x456...",
      isActive: true
    },
    {
      id: 3,
      name: "Municipal Bond #C789",
      value: 15000,
      maturityTime: 1735686000, // Dec 31, 2024
      interestRate: 4.1,
      owner: "0x789...",
      isActive: false
    }
  ];

  async getAllBonds(): Promise<Bond[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.bonds;
  }

  async getBondById(id: number): Promise<Bond | undefined> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.bonds.find(bond => bond.id === id);
  }

  async purchaseBond(name: string, value: number, maturityTime: number, interestRate: number): Promise<Bond> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newBond: Bond = {
      id: this.bonds.length + 1,
      name,
      value,
      maturityTime,
      interestRate,
      owner: "0x123...", // Simulated owner address
      isActive: true
    };
    this.bonds.push(newBond);
    return newBond;
  }

  async sellBond(id: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const bond = this.bonds.find(b => b.id === id);
    if (bond) {
      bond.isActive = false;
      return true;
    }
    return false;
  }

  async getUserBonds(owner: string): Promise<Bond[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.bonds.filter(bond => bond.owner === owner);
  }
}

export const bondService = new BondService();
