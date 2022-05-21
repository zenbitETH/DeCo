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
    <div class="2xl:mx-40 qhd:mx-96 mt-10">
      <Nuxt />
    </div>
    <nav class="bottom-l-hud">
      <nuxt-link class="huda" to="/new-business">
        <div class="bigIcon">
          🏪
        </div>Deco NFT
      </nuxt-link>
      <nuxt-link class="hudb " to="/dashboard">
        <div class="bigIcon">
          🎛️
        </div>My decos
      </nuxt-link>
    </nav>
    <nav class="bottom-r-hud">
      <nuxt-link class="hudc " to="/all-businesses">
        <div class="bigIcon">
          🗺️
        </div>Explore
      </nuxt-link>
      <nuxt-link class="hudd " to="/vaults">
        <div class="bigIcon xl:px-5">
          🏦
        </div><div class="">
          DeFi Vault
        </div>
      </nuxt-link>
    </nav>

    <Modal :show="showConnectWalletModal">
      <h2 class="wTitle text-deco-900 mb-10">
        Choose your wallet or create a new wallet
      </h2>
      <div class="grid grid-cols-3 text-center xl:px-10">
        <div class="wButton">
          <img src="../static/img/metamask.png" class="p-5 w-32 h-32 mx-auto" @click="connectWithMoralis()">
          Metamask
        </div>
        <div class="wButton">
          <img src="../static/img/wallet connect.png" class="p-5 w-32 h-32 mx-auto" @click="connectWithConnectWallet()">
          Wallet Connect
        </div>
        <div class="wButton">
          <img src="../static/img/coinbase.png" class="p-5 w-32 h-32 mx-auto" @click="connectWithCoinbaseWallet()">
          Coinbase Wallet
        </div>
      </div>
      <div class="text-center mt-10">
        <button class="myVaultBT py-3 px-5 text-2xl font-exo" @click="showConnectWalletModal = false">
          Cancel
        </button>
      </div>
    </Modal>
  </div>
</template>
<script>
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import Moralis from 'moralis'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'

import getBusinessByOwner from '~/contracts/business-nft/getBusinessByOwner'

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
      user: null
    }
  },
  computed: {
    connectedAddress () {
      return this.$store.state.connectedAddress
    }
  },
  beforeMount () {
    this.initMoralisUser()
    this.initWalletConnect()
    this.initCoinbaseWallet()

    if (this.connectedAddress) {
      setTimeout(this.loadResources, 3000)
    }
    // this.logOut()
    // console.log(this.walletConnector)

    // this.initWalletConnect()
  },
  methods: {
    loadResources () {
      getBusinessByOwner(this.$config.contractBusinessNft).then((response) => {
        this.$store.commit('setMyBusiness', response)
      })
      // getBusinessServices(this.$config.contractServiceNft)
      // getPurchasedServices(this.$config.contractServiceNft)
    },
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
        this.$store.commit('setConnectedAddress', this.walletConnector.accounts[0])
      }
    },
    initMoralisUser () {
      this.user = Moralis.User.current()
      if (this.user) { this.$store.commit('setConnectedAddress', this.user.get('ethAddress')) }
    },
    walletConnectOnConnect (error, payload) {
      if (error) { console.log(error) }

      console.log('connect', payload)
      this.$store.commit('setConnectedAddress', payload.params[0].accounts[0])
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
      this.$store.commit('setConnectedAddress', null)
      // Delete this.walletConnector
      this.walletConnector = null
    },
    async connectWithMoralis () {
      if (!this.user) {
        try {
          this.user = await Moralis.authenticate({
            signingMessage: 'Log in using Moralis'
          })
          if (this.user) { this.$store.commit('setConnectedAddress', this.user.get('ethAddress')) }
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
        this.showConnectWalletModal = false
        const accounts = response
        this.$store.commit('setConnectedAddress', accounts[0])
        // console.log(`User's address is ${accounts[0]}`)

        // Optionally, have the default account set for web3.js
        // web3.eth.defaultAccount = accounts[0]
      }).catch((e) => {
        console.error(e)
        this.showConnectWalletModal = false
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
      this.$store.commit('setConnectedAddress', null)
    }
  }
}
</script>
