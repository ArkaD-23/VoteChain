# VoteChain

## Overview
This project is a **secure, transparent, and decentralized** blockchain-based voting system. It eliminates fraud, improves transparency, and ensures efficiency by leveraging **Ethereum smart contracts**.

## Features
- **Security & Transparency**: Votes are recorded on an immutable blockchain.
- **Decentralization**: No central authority can manipulate results.
- **Authentication**: Only registered users can vote using their crypto wallets.
- **Efficiency**: Eliminates manual vote counting, reducing time and human error.

## Technologies Used
- Solidity (Smart Contracts)
- Web3.js (Blockchain Interactions)
- Ganache (Local Ethereum Blockchain)
- MetaMask (Ethereum Wallet)
- React.js (Frontend UI)
- Node.js & Express (Backend API)

## Prerequisites
Ensure you have the following installed:
- **Node.js** (>=16.x)
- **Ganache** (for local blockchain testing)
- **MetaMask** (for interacting with the blockchain)
- **Truffle** (for deploying contracts)

## Setup Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/blockchain-voting.git
cd blockchain-voting
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Start Ganache
- Open Ganache and create a new workspace.
- Copy the **RPC Server URL** (e.g., `http://127.0.0.1:7545`).
- Import the first Ganache account into MetaMask.

### 4. Compile & Deploy Smart Contracts
```sh
truffle compile
truffle migrate --network development
```

### 5. Run the Backend Server
```sh
cd backend
npm start
```

### 6. Start the Frontend
```sh
cd frontend
npm start
```

### 7. Connect MetaMask to Ganache
- Open MetaMask, go to **Settings > Networks**.
- Add a new network with **RPC URL** from Ganache.
- Import an account using the private key from Ganache.

## Running the Project
1. Ensure **Ganache** is running.
2. Deploy the smart contracts using **Truffle**.
3. Start both the **backend** and **frontend** servers.
4. Open the frontend in your browser (`http://localhost:3000`).
5. Connect your MetaMask wallet and start voting!

## Challenges Faced
- **Web3 Contract Calls**: Debugged errors using proper ABI and logging transaction failures.
- **Date Handling**: Converted JavaScript dates to Unix timestamps for Solidity compatibility.
- **Secure Voting**: Implemented mapping to prevent double voting.

## License
This project is licensed under the MIT License.

---
**Contributors:** Your Name

