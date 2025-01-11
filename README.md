# 🌟 BlockVest

<div align="center">

![BlockVest Logo](https://img.shields.io/badge/🏦-BlockVest-blue)

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org)
[![Truffle](https://img.shields.io/badge/Truffle-v5.11.5-orange.svg)](https://trufflesuite.com)
[![Web3.js](https://img.shields.io/badge/Web3.js-v4.16.0-blue.svg)](https://web3js.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

*A next-generation decentralized investment platform powered by blockchain technology*

[Explore Demo](https://github.com/notcaliper/blockvest) •
[Report Bug](https://github.com/notcaliper/blockvest/issues) •
[Request Feature](https://github.com/notcaliper/blockvest/issues)

</div>

---

## 🚀 Features

<div align="center">

| 🔐 Security | 📊 Analytics | 💼 Management |
|------------|-------------|---------------|
| Smart Contract Pools | Real-time Tracking | Portfolio Management |
| Secure Wallet Integration | Interactive Charts | Investment Strategies |
| Transparent Transactions | Performance Metrics | Automated Trading |

</div>

## 🏗️ Project Structure

```bash
blockvest/
├── 📱 frontend/         # React-based frontend application
├── ⚙️ backend/          # Backend server implementation
├── 📄 contracts/        # Smart contract source files
├── 🔧 smart-contracts/  # Additional smart contract utilities
├── 🔄 migrations/       # Truffle migration scripts
└── 🏗️ build/           # Compiled contracts and build artifacts
```

## 🛠️ Prerequisites

- 🟢 Node.js (v14 or higher)
- 🔶 Truffle Framework (v5.11.5)
- 🌐 Web3.js (v4.16.0)
- 🦊 MetaMask or similar Web3 wallet
- ⛓️ Ganache (v7.9.2) for local development

## 📦 Dependencies

### Core Dependencies
```json
{
  "react-router-dom": "^7.1.0",  // Application routing
  "recharts": "^2.15.0",         // Data visualization
  "lucide-react": "^0.469.0"     // Modern UI icons
}
```

### Development Tools
```json
{
  "@truffle/hdwallet-provider": "^2.1.15",
  "truffle": "^5.11.5",
  "web3": "^4.16.0",
  "ganache": "^7.9.2"
}
```

## 🚀 Quick Start

### 1️⃣ Installation

```bash
# Clone the repository
git clone https://github.com/notcaliper/blockvest.git
cd blockvest

# Install dependencies
npm install

# Configure environment
cp .env.example .env
```

### 2️⃣ Development Setup

```bash
# Start local blockchain
npx ganache

# Deploy smart contracts
npx truffle compile
npx truffle migrate
```

### 3️⃣ Launch Application

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

## 🧪 Testing

```bash
# Run the test suite
npx truffle test
```

## 🚢 Deployment

```bash
# Configure network in truffle-config.js
npx truffle migrate --network <network-name>
```

## 📞 Contact & Support

<div align="center">

[![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/notcaliper/blockvest)

Need help? [Open an issue](https://github.com/notcaliper/blockvest/issues)

</div>

---

<div align="center">
Made with ❤️ by the BlockVest Team
</div>
