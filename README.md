# Deco / Decentralized Commerce
Developed at [Hack Money 2022](https://showcase.ethglobal.com/hackmoney2022/deco-zxa8s)  

## About
This project lets users mint  IRL small businesses as NFTs and set them to create products or services and offer them on decentralized commerce as ERC 721 tokens.

90% of the income for products or service sales is deposited to the business owner while 10% is deposited into a vault to generate income from de-fi protocols. Punk Cities players will be able to verify Deco business to get Energy and Chips as rewards and use them to buy products or services on Deco and Deco owners will be able to exchange their energy and chips for ERC20 tokens.

## Contracts

[📚 Business NFT](https://mumbai.polygonscan.com/address/0xEAA8e3Db8166930ccaF2Da1765dA592E8F4933c0)
  
[📚 Service NFT](https://mumbai.polygonscan.com/address/0xfCF3798Ae93e09E3f01f4A546e80F7ef3cF5FEaE)

[📚 Vault NFT](https://mumbai.polygonscan.com/address/0x8E132BfDCa244bE72B066e3663ff2A202073Ae5c)

### Built with:

-Nuxt.js
-ERC721 contracts
-Wallet Connect
-Coinbase Wallet
-IPFS
-Covalent



### Dev Environemnt

Working with Polygon Mumbai testnet contracts (further update to deploy your own contracts)

1. Make `.env.sample`

```shell
touch .env.sample
```

add environment variable

```text
GOOGLE_MAPS_API_KEY=
MORALIS_APP_ID=
MORALIS_SERVER_URL=
CONTRACT_PUNK_CITIES=""
CONTRACT_BUSINESS_NFT=""
CONTRACT_SERVICE_NFT=""
CONTRACT_VAULT=""
NFT_STORAGE_API_KEY=""
```

3. Install dependencies

```bash
npm install
```

4. Start developmment

```bash
npm run dev
```

5. 📱 Open http://localhost:3000 to see the app