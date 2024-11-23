# Crowdfunding DApp

This is a decentralized crowdfunding application built using [Next.js](https://nextjs.org/), [Web3.js](https://web3js.readthedocs.io/), and [Material-UI](https://mui.com/). The application allows users to create and interact with crowdfunding campaigns on the Ethereum blockchain.

## Features

- **Campaign Creation:** Users can create new crowdfunding campaigns by specifying a target amount and a funding deadline.
- **Campaign Interaction:** Users can contribute to campaigns, track the status of their contributions, and view the overall progress of campaigns.
- **Web3 Integration:** The application interacts with the Ethereum blockchain using Web3.js. Users must connect their MetaMask wallet to interact with the app.
- **Email Notifications:** After creating a campaign, users can receive an email confirmation containing the campaign's smart contract address and the Ethereum network it's deployed on.

## Supported Networks

The Crowdfunding DApp supports the following Ethereum networks:

- **Mainnet (Pending):** Support for the Ethereum Mainnet is forthcoming. The application is still in beta, and this feature will be available in future updates.

- **Sepolia:** A test network that mirrors the Ethereum mainnet, Sepolia is used for development and testing purposes. The supporting libraries are deployed on Sepolia.

- **Localhost:** A local test network providing a stable environment for testing smart contracts.

To switch networks, simply select the desired network in your MetaMask wallet before interacting with the application.

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/mchantosa/crowdfunding-NextJS
cd crowdfunding-NextJS
npm install
```

Next, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

To run tests:

```bash
npm run test    #unit
npx playwright test #e2e
```

Additional Playwright tools:

```bash
npx playwright show-report  #view test report
npx playwright test --ui    #run example tests in UI mode
```

## Web3 Setup

To interact with the Ethereum blockchain, ensure you have MetaMask installed in your browser. The application will prompt you to connect your wallet upon accessing any page that requires blockchain interaction.

## Configuring for a local Ethereum Network

I have deployed the Utils library on the Sepolia network. To run this application on a local Hardhat network, you'll need to deploy the Utils library to your local network and configure its address in the web3.ts file. Instructions for setting up a local Ethereum network with Hardhat and deploying the Utils library can be found [here](https://github.com/mchantosa/smart-contract-generator).

## Environment Variables

This project requires the following environment variables:

- `NEXT_PUBLIC_RESEND_API_KEY`: Your Resend API key for sending emails.

## Email Notifications

The application uses Resend to send email notifications. You will need to verify your domain on [Resend](https://resend.com) to use this feature.

## Learn More

To learn more about the technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Web3.js Documentation](https://web3js.readthedocs.io/) - Learn how to interact with the Ethereum blockchain using Web3.js.
- [Material-UI Documentation](https://mui.com/getting-started/installation/) - Learn how to use Material-UI for styling React components.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
