<template>
  <div class="relative py-10 bg-gradient-to-t from-deco-900 to-deco-800 h-screen overflow-y-auto">
    <nav class="top-hud">
      <div class="hud1con">
        <div v-if="!connectedAddress" @click="showConnectWalletModal = true">
          Connect to Deco
        </div>
        <!-- TODO show only first and last 4 characters= 0x04...abcd-->
        <div v-else class="" @click="logOut()">
          {{ connectedAddress }}
        </div>
      </div>
      <div class="hud2">
        <span> ⚡ </span>
        <span class="mx-2">20</span>
      </div>
      <div class="hud4">
        <span> 💽 </span>
        <span class="mx-2">12</span>
      </div>
    </nav>
    <!-- The actual page will be inserted here -->
    <div class="fhd:mx-40 qhd:mx-96 mt-10">
      <Nuxt />
    </div>
    <nav class="bottom-l-hud">
      <nuxt-link class="huda" to="new-business">
        <div class="bigIcon">
          🆕
        </div>Deco NFT
      </nuxt-link>
      <nuxt-link class="hudc " to="dashboard">
        <div class="bigIcon">
          🎛️
        </div>My decos
      </nuxt-link>
    </nav>
    <nav class="bottom-r-hud">
      <nuxt-link class="hudd " to="all-businesses">
        <div class="bigIcon">
          🗺️
        </div>Explore
      </nuxt-link>
      <nuxt-link class="hude " to="vaults">
        <div class="bigIcon xl:px-5">
          🏦
        </div><div class="">
          DeFi Vault
        </div>
      </nuxt-link>
    </nav>

    <Modal :show="showConnectWalletModal">
      <h2 class="stepTitle">
        How would you like to connect?
      </h2>
      <div class="flex flex-row gap-3">
        <img src="/img/ic_wallet.png" class="p-5 w-32 h-32 mx-auto" @click="connectWithMoralis()">
        <img src="/img/ic_wallet-connect.png" class="p-5 w-32 h-32 mx-auto" @click="connectWithConnectWallet()">
        <img src="/img/ic_wallet.png" class="p-5 w-32 h-32 mx-auto" @click="connectWithCoinbaseWallet()">
      </div>
      <button class="px-3 py-1 bg-green-200 text-black text-lg text-center border-solid border border-green-400" @click="showConnectWalletModal = false">
        Cancel
      </button>
    </Modal>
  </div>
</template>
<script>
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import Moralis from 'moralis'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'

import Modal from '~/components/Modal.vue'

export default {
  components: {
    Modal
  },
  data () {
    return {
      showConnectWalletModal: false,

      coinbaseWallet: null,
      walletConnector: null,
      user: null,
      connectedAddress: null
    }
  },
  beforeMount () {
    this.initMoralisUser()
    this.initWalletConnect()
    this.initCoinbaseWallet()
    // console.log(this.walletConnector)

    // this.initWalletConnect()
  },
  methods: {
    initCoinbaseWallet () {
      // Initialize Coinbase Wallet SDK
      this.coinbaseWallet = new CoinbaseWalletSDK({
        appName: 'deco',
        appLogoUrl: '/deco-logo.png',
        darkMode: false
      })
    },
    initWalletConnect () {
      this.walletConnector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org', // Required
        qrcodeModal: QRCodeModal
      })
      if (this.walletConnector.connected) {
        this.connectedAddress = this.walletConnector.accounts[0]
      }
    },
    initMoralisUser () {
      this.user = Moralis.User.current()
      if (this.user) { this.connectedAddress = this.user.get('ethAddress') }
    },
    walletConnectOnConnect (error, payload) {
      if (error) { console.log(error) }

      console.log('connect', payload)
      this.connectedAddress = payload.params[0].accounts[0]
      // Get provided accounts and chainId
      // const { accounts, chainId } = payload.params[0]
    },
    walletConnectOnSessionUpdate (error, payload) {
      if (error) { console.log(error) }
      console.log('sessionUpdate', payload)

      // Get updated accounts and chainId
      // const { accounts, chainId } = payload.params[0],
    },
    walletConnectOnDisconnect (error, payload) {
      if (error) { console.log(error) }
      console.log('disconnect', payload)
      this.connectedAddress = null
      // Delete this.walletConnector
      this.walletConnector = null
    },
    async connectWithMoralis () {
      if (!this.user) {
        try {
          this.user = await Moralis.authenticate({
            signingMessage: 'Log in using Moralis'
          })
        } catch (e) {
          console.log(e)
        }
      }
      this.showConnectWalletModal = false
    },
    connectWithCoinbaseWallet () {
      const DEFAULT_ETH_JSONRPC_URL = 'https://polygon-rpc.com'
      const DEFAULT_CHAIN_ID = 137
      // Initialize a Web3 Provider object
      const ethereum = this.coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)
      // Use eth_requestAccounts
      ethereum.request({ method: 'eth_requestAccounts' }).then((response) => {
        const accounts = response
        this.connectedAddress = accounts[0]
        // console.log(`User's address is ${accounts[0]}`)

        // Optionally, have the default account set for web3.js
        // web3.eth.defaultAccount = accounts[0]
      })
    },
    connectWithConnectWallet () {
      if (!this.walletConnector) {
        this.walletConnector = new WalletConnect({
          bridge: 'https://bridge.walletconnect.org', // Required
          qrcodeModal: QRCodeModal
        })
      }
      // Check if connection is already established
      if (!this.walletConnector.connected) {
        // create new session
        this.walletConnector.createSession()
      }

      // Subscribe to connection events
      this.walletConnector.on('connect', this.walletConnectOnConnect)
      this.walletConnector.on('session_update', this.walletConnectOnSessionUpdate)
      this.walletConnector.on('disconnect', this.walletConnectOnDisconnect)
      this.showConnectWalletModal = false
    },
    async logOut () {
      if (this.user) {
        await Moralis.User.logOut()
        this.user = null
      } else if (this.walletConnector) {
        this.walletConnector.killSession()
      } else if (this.coinbaseWallet) {
        coinbaseWallet.disconnect()
      }
      this.connectedAddress = null
    }
  }
}
</script>
