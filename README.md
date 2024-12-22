# Blockvest - Blockchain-Based Bond Investment Platform

A decentralized application (DApp) for managing and trading bonds on the blockchain. Users can purchase, sell, and track bonds with real-time updates and secure transactions.

## Features

- Purchase and sell bonds using cryptocurrency
- Real-time bond value tracking
- Smart contract-based bond management
- User-friendly interface for bond transactions
- Secure authentication and authorization
- Blockchain-based transaction history

## Prerequisites

- Node.js (v18.x or higher)
- npm or yarn
- MetaMask browser extension
- Ganache (for local blockchain development)
- Truffle Suite

## Installation

1. Clone the repository:
```bash
git clone https://github.com/notcaliper/blockvest.git
cd blockvest
```

2. Install dependencies for the main project:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Install backend dependencies:
```bash
cd ../blockvest-backend
npm install
```

## Configuration

1. Start Ganache and create a workspace
2. Configure MetaMask:
   - Connect to Ganache (usually at http://localhost:8545)
   - Import a Ganache account using its private key

3. Deploy smart contracts:
```bash
# In the root directory
npx truffle migrate --reset
```

4. Update contract address:
   - Copy the deployed contract address from the migration output
   - Update the contractAddress in `frontend/src/services/bondService.ts`

## Running the Application

1. Start the backend server:
```bash
cd blockvest-backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Access the application:
   - Open your browser and navigate to http://localhost:5173
   - Connect your MetaMask wallet when prompted

## Usage

1. **Connecting Wallet**:
   - Click "Connect Wallet" to connect your MetaMask account
   - Approve the connection in MetaMask

2. **Purchasing Bonds**:
   - Fill in the bond details (name, value, maturity period, interest rate)
   - Click "Purchase Bond"
   - Confirm the transaction in MetaMask

3. **Viewing Bonds**:
   - Your purchased bonds will appear in the bonds list
   - View details including value, maturity date, and interest rate

4. **Selling Bonds**:
   - Select a bond from your portfolio
   - Click "Sell Bond"
   - Confirm the transaction in MetaMask

## Smart Contract Structure

The BondContract includes:
- Bond creation and management
- Ownership tracking
- Value calculation
- Maturity period handling
- Interest rate implementation

## Technology Stack

- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express
- Blockchain: Ethereum, Solidity
- Development Tools: Truffle, Ganache
- Web3 Integration: Web3.js
- Authentication: MetaMask

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
