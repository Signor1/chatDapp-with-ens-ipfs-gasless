# Decentralized Chat DApp

Welcome to the Decentralized Chat DApp branded `Chatzone`! This project aims to create a decentralized chat application using Ethereum blockchain and IPFS for secure profile image storage. Below you'll find information on the project structure, setup instructions, and how to contribute.

![Decentralized Chat DApp](https://github.com/Signor1/chatDapp-with-ens-ipfs-gasless/blob/68515becd36f881687d57035f167ea535e0093ee/Screenshot.png)


## Table of Contents

- [Decentralized Chat DApp](#decentralized-chat-dapp)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Contract Addresses](#contract-addresses)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Project Structure](#project-structure)
  - [Setup Instructions](#setup-instructions)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Overview

This project is a decentralized chat application built on Ethereum blockchain and IPFS. Users can securely communicate with each other using smart contracts for messaging and IPFS for profile image storage. Gasless transactions are facilitated through a custom relayer service.

## Contract Addresses

  - [ENS Contract Address](https://sepolia.etherscan.io/address/0x882f1e69cd5e2c5c172bf1ab8c9c192d8f581211)
  - [Chat Contract Address](https://sepolia.etherscan.io/address/0xfbc211edebc6b2b7738fd934e265737b0750b4ee)

## Features

- **Decentralized Messaging:** Users can send and receive messages securely through Ethereum smart contracts.
- **Profile Image Storage:** Profile images are stored on IPFS, ensuring decentralized and censorship-resistant access.
- **Gasless Transactions:** Gasless transactions are supported via a custom relayer service, allowing users to interact with the DApp without holding ETH.
- **ENS Integration:** Ethereum Name Service (ENS) is integrated to provide human-readable usernames for users.

## Technologies Used

- **Ethereum:** Ethereum blockchain is used for smart contract development and messaging functionality.
- **IPFS:** InterPlanetary File System (IPFS) is utilized for decentralized profile image storage.
- **Node.js:** Node.js is used for backend development, including the custom relayer service.
- **React:** React.js is used for building the frontend user interface.
- **Solidity:** Solidity is the programming language used for writing smart contracts.
- **Ethers.js:** Ethers.js is used for interacting with Ethereum blockchain from the frontend.
- **Express.js:** Express.js is used to create the custom relayer service.
- **Truffle Suite:** Truffle Suite is used for smart contract development, testing, and deployment.

## Project Structure

The project is structured as follows:

- `contracts/`: Contains Solidity smart contracts for the chat application and other functionalities.
- `frontend/`: Contains the React.js frontend for the decentralized chat DApp.
- `myRelayer/`: Contains the Node.js backend for the custom relayer service.
- `README.md`: The README file you are currently reading.

## Setup Instructions

To set up the project locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd decentralized-chat-dapp`
3. Install dependencies:
   - For frontend: `cd frontend && npm install`
   - For backend: `cd myRelayer && npm install`
4. Start the frontend and backend servers:
   - For frontend: `cd frontend && npm start`
   - For backend: `cd myRelayer && npm start`

## Usage

Once the project is set up and running, users can access the decentralized chat DApp through their web browser. They can register their username, upload a profile image, and start communicating with other users securely.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

